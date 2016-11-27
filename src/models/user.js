"use strict";

module.exports = (sequelize, DataTypes) => {
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
        associate:(models) => {
          User.hasMany(models.Pushability, { foreignKey: 'pusherId' });
          User.hasMany(models.Event, {
            foreignKey: 'ownerId',
            onDelete: 'cascade',
            hooks: true
          });
          User.belongsToMany(models.Pushability, {
            through: "UserPushability",
            foreignKey: 'userId',
            as: "targets"
          });
          User.belongsToMany(models.Event, {
            through: models.Invite,
            as: 'invitedEvents',
            foreignKey: 'userId'
          });
        },
        authenticate: (token) => {
          return(
            User.findOne({ where: {facebookToken: token} })
          );
        }
      },
      instanceMethods: {
        canDestroy: (user) => {
          return this.facebookToken == user.facebookToken;
        }
      }
    }
  );

  User.sync();

  return User;
};
