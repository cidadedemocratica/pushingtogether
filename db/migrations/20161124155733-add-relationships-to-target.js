'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('UsersPushabilities', 'pushabilityId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Pushabilities",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('UsersPushabilities', 'pushabilityId');
  }
};
