'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
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

        expiresAt: Sequelize.DATE
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Pushabilities');
  }
};
