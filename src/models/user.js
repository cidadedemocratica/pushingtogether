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

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
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

  User.sync();

  return User;
};
