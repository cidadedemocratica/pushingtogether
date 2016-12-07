/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

const status = require('./../utils/http_status_codes');
var ApplicationController = require('./application_controller');
var Conversation = ApplicationController.Conversation

var Crons = require('../crons/pushabilities_crons');

module.exports = () => {

  var create = (req, res) => {
    setImmediate(() => {
      var currentUser = req.currentUser;

      currentUser.createConversation(req.body)
      .then((conversation) => {
        Crons.runPushabilityInspector(conversation);
        res.status(status.OK).send({conversation: conversation});
      })
      .catch((err) => {
        console.error(err);
        res.status(status.BAD_REQUEST).send('Conversation cannot be created');
      });
    });
  }

  var show = (req,res) => {
    setImmediate(() => {
      Conversation.findById(req.params.id)
      .then((conversation) => {
        if(conversation){
          res.status(status.OK).send({conversation: conversation});
        }else {
          res.status(status.BAD_REQUEST).send('Conversation does not exist');
        }
      });
    });
  }

  var update = (req,res) => {
    setImmediate(() => {
      Conversation.findById(req.params.id)
      .then((conversation) => {
        if(conversation){
          conversation.update(req.body)
          .then((conversation) => {
            res.status(status.OK).send({conversation: conversation});
          })
        }else {
          res.status(status.BAD_REQUEST).send('Conversation does not exist');
        }
      });
    });
  }

  var destroy = (req,res) => {
    setImmediate(() => {
      Conversation.destroy({ where: { id: req.params.id } })
      .then((rows) => {
        if(rows) {
          res.status(status.OK).send('Conversation deleted with success');
        }
        else {
          res.status(status.BAD_REQUEST).send('Conversation does not exist');
        }
      });
    });
  }

  var getAll = (req,res) => {
    setImmediate(() => {
      Conversation.all()
      .then((conversations) => {
        res.status(status.OK).send({conversations: conversations});
      })
      .error((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).send('Internal server error');
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
