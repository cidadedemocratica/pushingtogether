/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

const status = require('./../utils/http_status_codes');
var ApplicationController = require('./application_controller');
var User = ApplicationController.User

module.exports = () => {

  var skipAuthFor = () => {
    return ["getAll"];
  }

  var create = (req,res) => {
    setImmediate(() => {
      var jsonStr = '{"action":"create user", "id": "1", "name": "Maurilio Atila"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(status.BAD_REQUEST).send('Invalid JSON string');
      }
    });
  }

  var show = (req, res) => {
    setImmediate(() => {
      User.findById(req.params.id)
      .then((user) => {
        if(user) {
            res.status(status.OK).send(user);
        }else {
          res.status(status.NOT_FOUND).send('User not found');
        }
      })

      .error((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).send('Internal server error');
      });
    });
  }

  var update = (req, res) => {
    setImmediate(() => {
      User.findById(req.params.id)
      .then((user) => {
        if(req.currentUser && user && req.currentUser.canUpdate(user)) {
          user.updateAttributes(req.body)
          .then((u) => {
            res.status(status.OK).send(user);
          })

          .error(() => {
            res.status(status.BAD_REQUEST).send('Error updating the user');
          });
        }else {
          res.status(status.NOT_FOUND).send('User not found or unauthorized');
        }
      })

      .error((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).send('Internal server error');
      });
    });
  }

  var destroy = (req, res) => {
    setImmediate(() => {
      User.findById(req.params.id)
      .then((user) => {
        if(req.currentUser && user && user.canDestroy(req.currentUser, user)) {
          user.destroy()
          .then((u) => {
            res.status(status.OK).send(user);
          })

          .error(() => {
            res.status(status.BAD_REQUEST).send('Error destroying the user');
          });
        }else {
          res.status(status.NOT_FOUND).send('User not found or unauthorized');
        }
      })

      .error((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).send('Internal server error');
      });
    });
  }

  var getAll = (req,res) => {
    setImmediate(() => {
      User.all()
      .then((users) => {
        res.status(status.OK).send({users: users});
      })

      .error((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).send('Internal server error');
      });
    });
  }

  return {
    create: (req, res) => {
      return create(req, res);
    },
    show: (req, res) => {
      return show(req, res);
    },
    update: (req, res) => {
      return update(req, res);
    },
    destroy: (req, res) => {
      return destroy(req, res);
    },
    getAll: (req, res) => {
      return getAll(req, res);
    },
    skipAuthFor: () => {
      return skipAuthFor();
    },
  }
}
