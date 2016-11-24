"use strict";

module.exports = function(sequelize, DataTypes){
  var Pushability = sequelize.define("Pushability", {
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      type: {
        type: DataTypes.STRING,
      }

    },
    {
      classMethods:{
        associate:function(models){
          Pushability.belongsTo(models.User, {as: 'pusher'});
          Pushability.belongsToMany(models.User, { through: 'UsersPushabilities' });
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
