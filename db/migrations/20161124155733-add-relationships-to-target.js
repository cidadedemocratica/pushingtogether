'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Targets', 'pushabilityId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Pushabilities",
        key: "id"
      }
    });

    queryInterface.addColumn('Targets', 'inviteId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Invites",
        key: "id"
      }
    });

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Targets', 'pushabilityId');
    queryInterface.removeColumn('Targets', 'inviteId');
  }
};
