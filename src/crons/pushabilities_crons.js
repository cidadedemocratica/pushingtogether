// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

require('promise-spread');

var cron = require('node-cron');
var polis = require('../../config/polis-api');
var Conversation = require('../models').Conversation;


// Functions
var getConsensusTopicsIds = (consensus) => {
  var topicsIds = [];

  consensus.agree.forEach((topic) => {
    topicsIds.push({
      id: topic.tid,
      membersOpinion: "A",
      nonMembersOpinion: "D"
    });
  });

  consensus.disagree.forEach((topic) => {
    topicsIds.push({
      id: topic.tid,
      membersOpinion: "D", // D = disagree, Pol.is sucks
      nonMembersOpinion: "A" // A = agree
    });
  });

  return topicsIds;
}

// fetch maiority opinion for each group
var getMaiorityGroupOpinionData = (data, conversation, potentActivists, groupId) => {
  var topicsIds = data["repness"][groupId].map((topic) => {
    return topic["tid"];
  });

  return fetchTopicData(conversation, topicsIds)
  .then((response) => {
    getActivists(response.data, potentActivists);
  })
  .catch((err) => {
    console.log("Error fetching topics data");
    console.log(err);
  });
}

var fetchTopicData = (conversation, topicsIds) => {
  return polis.get('comments', {
    params: {
      conversation_id: conversation.externalUrl,
      tids: topicsIds.join(','),
      include_social: true
    }
  });
}

var verifyClusters = (data, topic) => {
  return new Promise((resolve, reject)  => {
    var clustersVotes = data["votes-base"][topic.id][topic.nonMembersOpinion];
    // Pol.is clusterizes the people opinions, so if clusterSize > 0
    // means that the people in the cluster agree/disagree with the topic
    var membersInfoPromises = []
    clustersVotes.forEach((clusterSize, index) => {
      if (clusterSize != "0"){
        //if(topic.id == "7") console.log("quando igual a zero" + index);
        membersInfoPromises.push(getClusterMembers(data, index));
      }
    });

    resolve(membersInfoPromises);
  });
}

var getTopicMinority = (data, topic) => {

  return verifyClusters(data, topic)
  .then((clustersMembersInfoPromises) => {
    return Promise.all(clustersMembersInfoPromises)
    .spread((...clustersMembersInfo) => {
      var allMembersInfo = {}
      clustersMembersInfo.forEach((clusterMembersInfo) => {
        clusterMembersInfo.forEach((memberInfo) => {
          allMembersInfo[memberInfo[0]] = memberInfo[1];
        });
      });
      return {topicId: topic.id, potentialActivists: allMembersInfo};
    });
  });
}

var getClusterMembers = (data, clusterIndex) => {
  var membersIds = data["base-clusters"]["members"][clusterIndex];

  var findMembersGroupsPromises = membersIds.map((memberId) => {
    return getMemberGroup(data, memberId)
  });

  return Promise.all(findMembersGroupsPromises)
  .spread((...membersAndGroups) => {
    var clusterMembersInfo = membersAndGroups;
    return clusterMembersInfo;
  })
}

var getMemberGroup = (data, memberId) => {
  return new Promise((resolve, reject)  => {
    data["group-clusters"].forEach((group) => {
      if(group["members"].includes(memberId)){
        resolve([memberId, group.id]);
      }
    });
    // refactor with try catch
    resolve([memberId, -1]);
  });
}

var getActivists = (topicsInfo, potentActivists) => {
  topicsInfo.forEach((topic) => {
    if(topic.social){
      //calculate activists here
      console.log("Topic: " + topic["tid"] + " Author: " + topic.social["name"]);
    }
  });
}

// Crons
module.exports = {
  runPushabilityInspector: (conversation) => {
    var pushabilityInspectorCron = cron.schedule('*/5 * * * * *', () => {
      polis.get('math/pca2', {
        params: {
          conversation_id: conversation.externalUrl
        }
      })
      .then((res) => {
        var consensusTopicsIds = getConsensusTopicsIds(res.data.consensus);
        //console.log(consensusTopicsIds);

        var potentActivistsPerTopicsPromise = consensusTopicsIds.map((topic) => {
          //console.log(topic);
          return getTopicMinority(res.data, topic);
        });

        Promise.all(potentActivistsPerTopicsPromise)
        .spread((...potentActivistsPerTopic) => {
          var allPotentActivistsPerTopic = []
          potentActivistsPerTopic.forEach((potentActivists) => {
            if(Object.keys(potentActivists.potentialActivists) != 0){ 
              allPotentActivistsPerTopic.push(potentActivists);
            }
          });

          return allPotentActivistsPerTopic;
        })
        .then((allPotentActivistsPerTopic) => {
          res.data['group-clusters'].forEach((group) => {
            getMaiorityGroupOpinionData(
              res.data,
              conversation,
              allPotentActivistsPerTopic,
              group['id']
            );
          });
        });
      })
      .catch((err) => {
        console.log("Error with POLIS API");
        console.log(err);
      });
    }, false);
    
    pushabilityInspectorCron.start();
  },

  runVotesCounter: (conversation) => {
    var votesCounter = cron.schedule('* * * * * *', () => {
      polis.get('conversations', {
        params: {
          conversation_id: conversation.externalUrl
        }
      })
      .then((res) => {
        var votesCount = res.data.participant_count;
        console.log(votesCount);
        if(votesCount >= 41){
          module.exports.runPushabilityInspector(conversation);
          votesCounter.stop();
        }
      })
      .catch((err) => {
        console.log("Error with Votes Counter Cron");
        console.log(err);
      });
    });

    votesCounter.start();
  },

  startCrons: () => {
    Conversation.all()
    .then((conversations) => {
      conversations.forEach((conversation) => {
        module.exports.runVotesCounter(conversation);
      });
    });
  }
}
