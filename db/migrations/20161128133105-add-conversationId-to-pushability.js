'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Pushabilities', 'conversationId', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Pushabilities', 'conversationId');
  }
};
