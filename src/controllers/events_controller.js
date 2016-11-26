/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var ApplicationController = require('./application_controller');
var Event = ApplicationController.Event

module.exports = function() {

  var create = function(req, res){
    setImmediate(function() {
      req.currentUser.createEvent(req.body)
      .then(function(event) {
        if(event){
          // TODO: insert users to the event
          res.status(200).send({event: event});
        }else {
          res.status(400).send('Event cannot be created');
        }
      });
    });
  }

  var show = function(req,res){
    setImmediate(function() {
      Event.findById(req.params.id)
      .then(function(event) {
        if(event){
          res.status(200).send({event: event});
        }else {
          res.status(400).send('Event does not exist');
        }
      });
    });
  }

  var update = function(req,res){
    setImmediate(function() {
      Event.findById(req.params.id)
      .then(function(event) {
        if(event){
          event.update(req.body)
          .then(function(event) {
            res.status(200).send({event: event});
          })
        }else {
          res.status(400).send('Event does not exist');
        }
      });
    });
  }

  var destroy = function(req,res){
    setImmediate(function() {
      Event.destroy({ where: { id: req.params.id } })
      .then(function(rows) {
        if(rows) {
          res.status(200).send('Event deleted with success');
        }
        else {
          res.status(400).send('Event does not exist');
        }
      });
    });
  }

  var getAll = function(req,res){
    setImmediate(function () {
      Event.all()
      .then(function (events) {
        res.status(200).send({events: events});
      })
      .error(function(err){
        res.status(500).send('Internal server error');
      });
    });

  }

  return {
    create: function(req,res){
      return create(req,res);
    },
    show: function(req,res){
      return show(req,res);
    },
    update: function(req,res){
      return update(req,res);
    },
    destroy: function(req,res){
      return destroy(req,res);
    },
    getAll: function(req,res){
      return getAll(req,res);
    }
  }
}
