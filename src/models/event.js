"use strict";

module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define("Event", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      description: {
        type: DataTypes.TEXT,
        validade: {
            max: 900,
            min: 20
        }
      },

      date: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
        }
      },

      address: DataTypes.STRING
    },
    {
      classMethods:{
        associate:(models) => {
          Event.belongsTo(models.User, {as: 'owner'});
          Event.belongsToMany(models.User, {
            through: models.Invite,
            foreignKey: 'eventId'
          });
        }
      }
    }
  );

  Event.sync();

  return Event;
};
