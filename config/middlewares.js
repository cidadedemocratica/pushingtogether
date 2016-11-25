'use strict';

var User = require('../src/models/').User;

var Middlewares = {
  Auth: function (req) {
    console.log(req.headers['facebooktoken']);
    console.log(req.headers.facebooktoken);
    return (
      User.authenticate(req.headers.facebooktoken)
    );
  }
};

module.exports = Middlewares;


