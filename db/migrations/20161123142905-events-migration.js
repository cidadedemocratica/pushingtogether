'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'Events',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        address: Sequelize.STRING,
        date: Sequelize.DATE,
        ownerId: Sequelize.INTEGER,
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Events');
  }

};
