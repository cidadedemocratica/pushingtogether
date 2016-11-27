'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Invites',
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

        eventId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Events",
            key: "id"
          }
        },

        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        },

        status: Sequelize.STRING,
        isNotificationEnabled: Sequelize.BOOLEAN

      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Invites');
  }
};
