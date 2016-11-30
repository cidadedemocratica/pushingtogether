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

module.exports = {
  pushabilityInspector: cron.schedule('*/5 * * * * *', () => {
    console.log('running a task every minute');
  }, false),
}
