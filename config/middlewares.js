'use strict';

var User = require('../src/models/').User;

var Middlewares = {
  Auth: function (req) {
    return (
      User.authenticate(req.headers.facebooktoken)
      .then(function (currentUser) {
        req.currentUser = currentUser;
      })
    );
  }
};

module.exports = Middlewares;


