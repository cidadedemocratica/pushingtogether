/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var models = require('../models/index.js');
var Pushability = models.Pushability;

module.exports = () => {

  var create = (req, res) => {
    setImmediate(() => {
      req.currentUser.createPushability(req.body)
      .then((Pushability) => {
        if(Pushability){
          // TODO: insert users to the Pushability
          res.status(200).send({Pushability: Pushability});
        }else {
          res.status(400).send('Pushability cannot be created');
        }
      });
    });
  }

  var show = (req,res) => {
    setImmediate(() => {
      Pushability.findById(req.params.id)
      .then((Pushability) => {
        if(Pushability){
          res.status(200).send({Pushability: Pushability});
        }else {
          res.status(400).send('Pushability does not exist');
        }
      });
    });
  }

  var update = (req,res) => {
    setImmediate(() => {
      Pushability.findById(req.params.id)
      .then((Pushability) => {
        if(Pushability){
          Pushability.update(req.body)
          .then((Pushability) => {
            res.status(200).send({Pushability: Pushability});
          })
        }else {
          res.status(400).send('Pushability does not exist');
        }
      });
    });
  }

  var destroy = (req,res) => {
    setImmediate(() => {
      Pushability.destroy({ where: { id: req.params.id } })
      .then((rows) => {
        if(rows) {
          res.status(200).send('Pushability deleted with success');
        }
        else {
          res.status(400).send('Pushability does not exist');
        }
      });
    });
  }

  var getAll = (req,res) => {
    setImmediate(() => {
      Pushability.all()
      .then((Pushabilitys) => {
        res.status(200).send({Pushabilitys: Pushabilitys});
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
