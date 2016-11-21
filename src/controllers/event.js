/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

module.exports=function() {

  var create = function(req,res){
    setImmediate(function () {
      //TODO: call controller add
      var jsonStr = '{"action":"update event", "id": 2, "date": "date", "location": "Itú, SP", "description": "Escalada do Varvito", "owner": "parra"};
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }
  
  var show = function(req,res){
    setImmediate(function () {
      // TODO: call controller show
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
      //TODO: call controle update
      var jsonStr = '{"action":"update event", "id": '+req.params.id+', "date": "date", "location": "Itú, SP", "description": "Escalada do Varvito", "owner": "parra"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }
  
  var _delete = function(req,res){
    setImmediate(function () {
      //TODO: call controller delete and see if event exists
      try {
        res.send('Success');
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }

  var getAll = function(req,res){
    setImmediate(function () {
      //TODO: call controller getAll
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
     return create(req,res)
   },
   show: function(req,res){
     return show(req,res)
   },
   update: function(req,res){
     return update(req,res)
   },
   delete: function(req,res){
     return _delete(req,res)
   }
   getAll: function(req,res){
     return getAll(req,res)
    
  }
}
