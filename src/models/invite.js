"use strict";

module.exports = function(sequelize, DataTypes){
  var Invite = sequelize.define("Invite", {
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

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
        associate:function(models){
          Invite.belongsTo(models.Event);
          Invite.belongsTo(models.User);
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
