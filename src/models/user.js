"use strict";

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          allowNull: false
        }
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          allowNull: false
        }
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          min: 8,
          max: 255
        }
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      facebookToken: DataTypes.TEXT
    }
  );

  return User;
};
