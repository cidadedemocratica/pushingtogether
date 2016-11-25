'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('UsersPushabilities', 'pushabilityId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Pushabilities",
        key: "id"
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('UsersPushabilities', 'pushabilityId');
  }
};
