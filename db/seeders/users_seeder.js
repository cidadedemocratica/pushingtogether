'use strict';

var models = require('../../src/models');
var User = models.User;
var helper = require('../../test/helper');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.create(helper.validUserAttributes)
    .then((user) => {
      user.createConversation(helper.validConversationAttributes);
    });
  },

  down: function (queryInterface, Sequelize) {
    return User.destroy({ where: {} });
  }
};


