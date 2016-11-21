'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'users',
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
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        externalId: Sequelize.INTEGER,
//        attr3: {
//          type: Sequelize.BOOLEAN,
//          defaultValue: false,
//          allowNull: false
//        },
//        //foreign key usage
//        attr4: {
//            type: Sequelize.INTEGER,
//            references: {
//                model: 'another_table_name',
//                key: 'id'
//            },
//            onUpdate: 'cascade',
//            onDelete: 'cascade'
//        }
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
