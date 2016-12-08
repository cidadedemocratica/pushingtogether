/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var models = require('../models/index.js');
var Event = models.Event;
var Pushability = models.Pushability;

module.exports = () => {

  var create = (req, res) => {
    setImmediate(() => {
      var currentUser = req.currentUser;
      var conversationId = req.body.conversationId;

      Pushability.findOne({
        where: {
          conversationId: conversationId,
          active: true,
          type: Pushability.types.EVENT
        }
      })
      .then((pushability) => {
        return currentUser.createEvent(req.body)
        .then((event) => {
          return pushability.getUsers()
          .then((users) => {
            return event.addUsers(users)
            .then(() => {
              res.status(200).send({event: event});
            });
          });
        });
      })
      .catch((err) => {
        res.status(400).send('Event cannot be created');
      });
    });
  }

  var show = (req,res) => {
    setImmediate(() => {
      Event.findById(req.params.id)
      .then((event) => {
        if(event){
          res.status(200).send({event: event});
        }else {
          res.status(400).send('Event does not exist');
        }
      });
    });
  }

  var update = (req,res) => {
    setImmediate(() => {
      Event.findById(req.params.id)
      .then((event) => {
        if(event){
          event.update(req.body)
          .then((event) => {
            res.status(200).send({event: event});
          })
        }else {
          res.status(400).send('Event does not exist');
        }
      });
    });
  }

  var destroy = (req,res) => {
    setImmediate(() => {
      Event.destroy({ where: { id: req.params.id } })
      .then((rows) => {
        if(rows) {
          res.status(200).send('Event deleted with success');
        }
        else {
          res.status(400).send('Event does not exist');
        }
      });
    });
  }

  var getAll = (req,res) => {
    setImmediate(() => {
      Event.all()
      .then((events) => {
        res.status(200).send({events: events});
      })
      .error((err) => {
        res.status(500).send('Internal server error');
      });
    });

  }

  return {
    create: (req,res) => {
      return create(req,res);
    },
    show: (req,res) => {
      return show(req,res);
    },
    update: (req,res) => {
      return update(req,res);
    },
    destroy: (req,res) => {
      return destroy(req,res);
    },
    getAll: (req,res) => {
      return getAll(req,res);
    }
  }
}
