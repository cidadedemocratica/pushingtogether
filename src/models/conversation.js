"use strict";

module.exports = (sequelize, DataTypes) => {
  var Conversation = sequelize.define("Conversation", {
      externalUrl: DataTypes.STRING,
    },
    {
      classMethods:{
        associate:(models) => {
          Conversation.belongsTo(models.User, {as: 'owner'});
          Conversation.hasMany(models.Pushability, {
            foreignKey: 'conversationId',
            onDelete: 'cascade',
            hooks: true
          });
        }
      }
    }
  );

  Conversation.sync();

  return Conversation;
};
