'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Pushabilities', 'externalTopicId', {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Pushabilities', 'externalTopicId');
  }
};
