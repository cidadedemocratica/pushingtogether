'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
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

        targetId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Targets",
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

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Invites');
  }
};
