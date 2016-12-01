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

module.exports = {
  runPushabilityInspector: (conversation) => {
    var pushabilityInspectorCron = cron.schedule('* * * * * *', () => {
      polis.get('ptptois', {
        params: {
          conversation_id: conversation.externalUrl
        }
      })
      .then((res) => {
        console.log(res.data);
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
console.log(conversation.externalUrl);
      polis.get('conversations', {
        params: {
          conversation_id: conversation.externalUrl
        }
      })
      .then((res) => {
        var votesCount = res.data.participant_count;
        console.log(votesCount);
        if(votesCount >= 40){
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
