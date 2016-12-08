/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var models = require('../models/index.js');
var Conversation = models.Conversation;
var Crons = require('../crons/pushabilities_crons');

module.exports = () => {

  var create = (req, res) => {
    setImmediate(() => {
      var currentUser = req.currentUser;

      currentUser.createConversation(req.body)
      .then((conversation) => {
        Crons.runPushabilityInspector(conversation);
        res.status(200).send({conversation: conversation});
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send('Conversation cannot be created');
      });
    });
  }

  var show = (req,res) => {
    setImmediate(() => {
      Conversation.findById(req.params.id)
      .then((conversation) => {
        if(conversation){
          res.status(200).send({conversation: conversation});
        }else {
          res.status(400).send('Conversation does not exist');
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
            res.status(200).send({conversation: conversation});
          })
        }else {
          res.status(400).send('Conversation does not exist');
        }
      });
    });
  }

  var destroy = (req,res) => {
    setImmediate(() => {
      Conversation.destroy({ where: { id: req.params.id } })
      .then((rows) => {
        if(rows) {
          res.status(200).send('Conversation deleted with success');
        }
        else {
          res.status(400).send('Conversation does not exist');
        }
      });
    });
  }

  var getAll = (req,res) => {
    setImmediate(() => {
      Conversation.all()
      .then((conversations) => {
        res.status(200).send({conversations: conversations});
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
