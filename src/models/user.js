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
    }
  );

  User.sync();

  return User;
};
