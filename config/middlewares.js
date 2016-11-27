'use strict';

var User = require('../src/models/').User;

var Middlewares = {
  Auth: (req) => {
    return (
      User.authenticate(req.headers.facebooktoken)
      .then((currentUser) => {
        req.currentUser = currentUser;
      })
    );
  }
};

module.exports = Middlewares;


