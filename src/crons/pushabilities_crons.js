// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

var cron = require('node-cron');
var polis = require('../../config/polis-api');
var Conversation = require('../models').Conversation;


// Functions
var getConsensusTopicsIds = (consensus) => {
  var topicsIds = [];

  consus.agree.forEach((topic) => {
    topicsIds.push({
      id: topic.tid,
      membersOpinion: "A",
      nonMembersOpinion: "D"
    });
  });

  consus.disagree.forEach((topic) => {
    topicsIds.push({
      id: topic.tid,
      membersOpinion: "D", // D = disagree, Pol.is sucks
      nonMembersOpinion: "A" // A = agree
    });
  });

  return topicsIds;
}

// fetch maiority opinion for each group
var getMaiorityGroupOpinionData = (data, groupId) => {
  var topicsIds = data["repness"][groupId].map((topic) => {
    return topic["tid"];
  });

  //fetchTopicData(topicsIds);
}

var fetchTopicData = (topicsIds) => {
  polis.get('comments', {
    params: {
      conversation_id: conversation.externalUrl,
      tids: topicsIds,
      include_social: true
    }
  })
  .then((res) => {
    var votesCount = res.data.participant_count;
    console.log(votesCount);
    if(votesCount >= 36){
      module.exports.runPushabilityInspector(conversation);
      votesCounter.stop();
    }
  })
  .catch((err) => {
    console.log("Error with Votes Counter Cron");
    console.log(err);
  });
}

var getTopicMinority = (data, topic) => {
  var clustersVotes = data["votes-base"][topic.id][topic.nonMembersOpinion];
  var members = {}
  // Pol.is clusterizes the people opinions, so if clusterSize > 0
  // means that the people in the cluster agree/disagree with the topic
  clustersVotes.forEach((clusterSize, index) => {
    if (clusterSize != "0"){
      getClusterMembers(data, index).forEach((member) => {
        members[member["id"]] = member["group"];
      });
    }
  });

  return members;
}

var getClusterMembers = (data, clusterIndex) => {
  var membersIds = data["base-clusters"]["members"][clusterIndex]
  var membersInfo = membersIds.map((memberId) => {
    return { id: memberId, group: getMemberGroup(data, memberId) };
  });

  return membersInfo;
}

var getMemberGroup = (data, memberId) => {
  data["group-clusters"].forEach((group) => {
    if(group["members"].includes(memberId)){
      return group["id"];
    }
  });
}

// Crons
module.exports = {
  runPushabilityInspector: (conversation) => {
    var pushabilityInspectorCron = cron.schedule('* * * * * *', () => {
      polis.get('math/pca2', {
        params: {
          conversation_id: conversation.externalUrl
        }
      })
      .then((res) => {
        var consensusTopicsIds = getConsensusTopicsIds(res.data.consensus);
        
        
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
        if(votesCount >= 36){
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
