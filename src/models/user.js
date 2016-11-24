"use strict";

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      password: DataTypes.STRING,

      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      facebookToken: DataTypes.TEXT,
      facebookId: DataTypes.STRING,
      externalId: DataTypes.STRING
    },
    {
      classMethods:{
        associate:function(models){
          User.belongsToMany(models.Event, {through: 'Invites', foreignKey: 'eventId'})
        }
      }
    }
  );

  User.sync();

  return User;
};
