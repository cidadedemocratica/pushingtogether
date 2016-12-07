/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

const status = require('./../utils/http_status_codes');
var ApplicationController = require('./application_controller');
var Event = ApplicationController.Event
var Invite = ApplicationController.Invite

module.exports = () => {

  var accept = (req, res) => {
    setImmediate(() => {
      var currentUser = req.currentUser;
      var eventId = req.params.id;

      Invite.findOne({
        where: {
          userId: currentUser.id,
          eventId: eventId
        }
      })
      .then((invite) => {
        return invite.updateAttributes({status: Invite.status.CONFIRMED})
        .then(() => {
          return Event.findById(eventId)
          .then((event) => {
            res.status(status.OK).send({event: event});
          });
        });
      })
      .catch((err) => {
        res.status(status.BAD_REQUEST).send('Event cannot be updated');
      });
    });
  }

  return {
    accept: (req,res) => {
      return accept(req,res);
    }
  }
}
