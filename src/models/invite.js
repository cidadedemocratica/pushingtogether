"use strict";

module.exports = (sequelize, DataTypes) => {
  var Invite = sequelize.define("Invite", {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      isNotificationEnabled: DataTypes.BOOLEAN
    },
    {
      classMethods:{
        associate:(models) => {
          Invite.belongsTo(models.Event, { foreignKey: 'eventId' });
          Invite.belongsTo(models.User, { foreignKey: 'userId' });
        },
        status: {
          CONFIRMED: "confirmed",
          PENDING: "pending"
        }
      }
    }
  );

  Invite.sync();

  return Invite;
};
