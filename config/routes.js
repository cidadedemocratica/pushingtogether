/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var User = require('../src/controllers/users_controller.js');
var Event = require('../src/controllers/events_controller.js');

module.exports = function(app, base) {
  resourcesFor(app, base, 'users', User.call());
  resourcesFor(app, base, 'events', Event.call());
}

function resourcesFor(app, base, name, resource){
  //create
  app.post(base + '/' + name , function (req, res) {
    resource.create(req,res);
  });

  //show
  app.get(base + '/' + name + '/:id', function (req, res) {
    resource.show(req,res);
  });

  //update
  app.put(base + '/' + name + '/:id', function (req, res) {
    resource.update(req,res);
  });

  //destroy
  app.delete(base + '/' + name + '/:id', function (req, res) {
    resource.destroy(req,res);
  });

  //show all
  app.get(base + '/' + name, function (req, res) {
    resource.getAll(req,res);
  });
}
