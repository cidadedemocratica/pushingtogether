/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

module.exports=function() {

  var create = function(req,res){
    setImmediate(function () {
      //TODO: call controller add
      var jsonStr = '{"action":"create user", "id": "1", "name": "Maurilio Atila"}';
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
      var jsonStr = '{"action":"show user", "id": '+req.params.id+', "name": "Maurilio Atila"}';
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
      var jsonStr = '{"action":"update user", "id": '+req.params.id+', "name": "Maurilio Atila"}';
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
      //TODO: call controller delete and see if user exists
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
      var jsonStr = '{"users": [{"action":"update user", "id": 2, "name": "Maurilio Atila"}, {"action":"update user", "id": 2, "name": "Henrique Parra"}]}';
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
