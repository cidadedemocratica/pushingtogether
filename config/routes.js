/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var User = require('../src/controllers/users_controller.js');
var Event = require('../src/controllers/events_controller.js');
var Middleware = require('./middlewares');

module.exports = function(router, base, passport) {

  facebookAuth(router, passport);
  resourcesFor(router, base, 'users', User.call());
  resourcesFor(router, base, 'events', Event.call());

  //test
  router.get('/', function (req, res) {
    res.send(req.session.passport);
  });

  //error
  router.get('/error', function (req, res) {
    console.log("Errou!");
    res.send("ERROOOU!");
  });
};

function resourcesFor(router, base, name, resource){
  //create
  router.post(base + '/' + name , function (req, res) {
    resource.create(req,res);
  });

  //show
  router.get(base + '/' + name + '/:id', function (req, res) {
    Middleware.Auth(req)
    .then(function (current_user){
      resource.show(req,res);
    });
  });

  //update
  router.put(base + '/' + name + '/:id', function (req, res) {
    Middleware.Auth(req)
    .then(function (current_user){
      resource.update(req,res);
    });
  });

  //destroy
  router.delete(base + '/' + name + '/:id', function (req, res) {
    Middleware.Auth(req)
    .then(function (current_user){
      resource.destroy(req, res, current_user);
    });
  });

  //show all
  router.get(base + '/' + name, function (req, res, next) {
    Middleware.Auth(req)
    .then(function (current_user){
      resource.getAll(req,res);
    });
  });
};

function facebookAuth(router, passport){
  //ask for permission
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  //handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/error'
    })
  );

  //route for logging out
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};
