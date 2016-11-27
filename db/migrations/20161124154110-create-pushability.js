'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Pushabilities',
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

        pusherId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        },

        expiresAt: Sequelize.DATE,
        type: Sequelize.STRING
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Pushabilities');
  }
};
