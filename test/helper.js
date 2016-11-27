var models = require('../src/models');
var Pushability = models.Pushability
var User = models.User

module.exports = {
  validUserAttributes: {
    name: "User test",
    email: "open_qjudejy_user@tfbnw.net",
    password: "userpassword123",
    facebookId: "125402244609647",
    facebookToken: "EAAX5XzZBpSxkBAKLU51QBmZCtDGeWSgUZCTgxuh4qxQSEUZA1D2XS"
    + "ODle2UDoAbQ6zBnVXySonhJflKrjOdWPTWMDET8QFXeRZCF49dsj83IBMMoRySgaJdb"
    + "Sxar4aSg5sIXsSdAbhIjTZCsP2ZAh7SZCWa0uIL492jeEDpV5ZARFrgaBvYiQbenW",
    externalId: "1234567892"
  },

  validEventAttributes: {
    title: "Test Event",
    description: "Description Test Description Test",
    address: "Address Test",
    date: Date.now()
  },

  createUser: function(name) {
    attributes = this.validUserAttributes;
    attributes.name = name;
    attributes.email = name + attributes.email;
    attributes.facebookToken = attributes.facebookToken + name;
    return (
      User.create(attributes)
    );
  },

  validPushabilityAttributes: {
    expiresAt: Date.now(),
    type: Pushability.types.EVENT
  }

  validPushabilitytAttributes: {
    expiresAt: Date.now()
    type: Pushability.types.EVENT
  }
}
