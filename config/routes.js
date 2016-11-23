/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var User = require('../src/controllers/users_controller.js');
var Event = require('../src/controllers/events_controller.js');

module.exports = function(app, base, passport) {
  facebookAuth(app, passport);
  resourcesFor(app, base, 'users', User.call());
  resourcesFor(app, base, 'events', Event.call());

  //test
  app.get('/', function (req, res) {
    res.send(req.session.passport);
  });

  //error
  app.get('/error', function (req, res) {
    console.log("Errou!");
  });
};

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
};

function facebookAuth(app, passport){
  //ask for permission
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  //handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/error'
    })
  );

  //route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
