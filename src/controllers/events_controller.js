/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var ApplicationController = require('./application_controller');

module.exports = function() {
  ApplicationController.call(this);

  var create = function(req, res){
    setImmediate(function() {
      req.currentUser.createEvent(req.params)
      .then(function(event, done) {
        if(event){
          // TODO: insert users to the event
          res.status(200).send({event: event});
        }else {
          res.status(400).send('Invalid JSON string');
        }
        done();
      });
    });
  }
  
  var show = function(req,res){
    setImmediate(function () {
      // TODO: call model show
      var jsonStr = '{"action":"update event", "id": '+req.params.id+', "date": "date", "location": "Itú, SP", "description": "Escalada do Varvito", "owner": "parra"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }

  var update = function(req,res){ 
    setImmediate(function () {
      //TODO: call model update
      var jsonStr = '{"action":"update event", "id": '+req.params.id+', "date": "date", "location": "Itú, SP", "description": "Escalada do Varvito", "owner": "parra"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }
  
  var destroy = function(req,res){
    setImmediate(function () {
      //TODO: call model delete and see if event exists
      try {
        res.send('Success');
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }

  var getAll = function(req,res){
    setImmediate(function () {
      //TODO: call model getAll
      var jsonStr = '{"events": [{"action":"update event", "id": 2, "name": "Maurilio Atila"}, {"action":"update event", "id": 2, "name": "Henrique Parra"}]}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
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
