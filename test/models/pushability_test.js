var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');

var Pushbility = models.Pushability;
var User = models.User;

describe('Pushability', function() {
  describe('Check pushability relations', function() {

    var _pusher = null, _pushability = null;

    beforeEach( function(done) {
      User.create(helper.validUserAttributes)
      .then( function(user) {
        _pusher = user;
        _pusher.createPushability(helper.validPushabilitytAttributes)
        .then( function(pushability){
          _pushability = pushability;
          done();
        });
      });
    });

    afterEach(function(done) {
      _pushability .destroy()
      .then(function() {
        _pusher.destroy()
        .then(function() {
          done();
        });
      });
    });

    it("should return all pushability a user has", function(done) {
      _puser.getPushabilities()
      .then(function(pushabilities) {
        expect(pushabilites.length).toBe(1);
      })
    });

});
