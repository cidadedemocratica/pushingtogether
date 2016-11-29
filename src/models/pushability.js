"use strict";

module.exports = (sequelize, DataTypes) => {
  var Pushability = sequelize.define("Pushability", {
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      active: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
    },
    {
      classMethods:{
        associate:(models) => {
          Pushability.belongsTo(models.Conversation, {as: 'conversation'});
          Pushability.belongsTo(models.User, {as: 'pusher'});
          Pushability.belongsToMany(models.User, {
            through: 'UsersPushabilities',
            foreignKey: 'pushabilityId'
          });
        },
        types: {
          EVENT: "event"
        }
      }
    }
  );

  Pushability.sync();

  return Pushability;
};
