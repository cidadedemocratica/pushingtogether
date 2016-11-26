'use strict';

var models = require('../models/index.js');

module.exports = function() {
  var self = this || {};

  self.User =  models.User;
  self.Event = models.Event;
};
