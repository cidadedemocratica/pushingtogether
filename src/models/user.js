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
      classMethods: {
        associate:function(models) {
          User.hasMany(models.Pushability, {foreignKey: 'pusherId' });
          User.hasMany(models.Event, {foreignKey: 'ownerId' });
          User.belongsToMany(models.Pushability, {
            through: "UsersPushabilities",
            foreignKey: 'userId',
            as: "targets"
          });
          User.belongsToMany(models.Event, { through: "Invite"});
        },
        authenticate: function(token) {
          return(
            User.findOne({ where: {facebookToken: token} })
          );
        }
      },
      instanceMethods: {
        canDestroy: function(user) {
          return this.facebookToken == user.facebookToken;
        }
      }
    }
  );

  User.sync();

  return User;
};
