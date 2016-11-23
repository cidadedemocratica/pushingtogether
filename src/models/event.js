"use strict";

module.exports = function(sequelize, DataTypes){
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
    }
  );

  Event.sync();

  return Event;
};
