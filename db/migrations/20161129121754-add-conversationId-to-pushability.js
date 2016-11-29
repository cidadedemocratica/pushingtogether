'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Pushabilities', 'conversationId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Conversations",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Pushabilities', 'conversationId');
  }
};
