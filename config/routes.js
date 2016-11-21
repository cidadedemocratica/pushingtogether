/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

module.exports=function(app, base) {
  
  //user
 
  //create
  app.post(base+'/user', function (req, res) {
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
  })
  //show
  app.get(base+'/user/:id', function (req, res) {
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
  })
  //update
  app.put(base+'/user/:id', function (req, res) {
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
  })
  //delete
  app.delete(base+'/user/:id', function (req, res) {
    setImmediate(function () {
      //TODO: call controller delete and see if user exists
      try {
        res.send('Success');
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  })
  //show all
  app.get(base+'/users', function (req, res) {
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
  })

  //event
 
  //create
  app.post(base+'/event', function (req, res) {
    setImmediate(function () {
      //TODO: call controller add
      var jsonStr = '{"action":"create event", "id": "1", "name": "Maurilio Atila"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  })
  //show
  app.get(base+'/event/:id', function (req, res) {
    setImmediate(function () {
      // TODO: call controller show
      var jsonStr = '{"action":"show event", "id": '+req.params.id+', "name": "Maurilio Atila"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  })
  //update
  app.put(base+'/event/:id', function (req, res) {
    setImmediate(function () {
      //TODO: call controle update
      var jsonStr = '{"action":"update event", "id": '+req.params.id+', "name": "Maurilio Atila"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  })
  //delete
  app.delete(base+'/event/:id', function (req, res) {
    setImmediate(function () {
      //TODO: call controller delete and see if event exists
      try {
        res.send('Success');
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  })
  //show all
  app.get(base+'/events', function (req, res) {
    setImmediate(function () {
      //TODO: call controller getAll
      var jsonStr = '{"events": [{"action":"update event", "id": 2, "date": "date", "location": "Madrid", "description": "Vegetariano en el Baobab", "owner": "cabelo"}, {"action":"update event", "id": 2, "date": "date", "location": "Itú, SP", "description": "Escalada do Varvito", "owner": "parra"}]}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  })
  
}
