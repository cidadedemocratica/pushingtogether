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
}
