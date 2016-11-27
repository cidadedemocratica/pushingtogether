var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');

var Pushbility = models.Pushability;
var User = models.User;

describe('Pushability', () => {
  describe('Check pushability relations', () => {

    describe('Using valid attributes', () => {
      var _pusher = null, _pushability = null;

      beforeEach( (done) => {
        User.create(helper.validUserAttributes)
        .then( (user) => {
          _pusher = user;
          _pusher.createPushability(helper.validPushabilitytAttributes)
          .then( (pushability) => {
            _pushability = pushability;
            done();
          });
        });
      });

      afterEach( (done) => {
        _pushability .destroy()
        .then( () => {
          _pusher.destroy()
          .then( () => {
            done();
          });
        });
      });

      it("should return all pushability a user has", (done) => {
        _puser.getPushabilities()
        .then((pushabilities) => {
          expect(pushabilites.length).toBe(1);
        });
      });

      it("should add some user as a target", (done) => {
        _pushability.getUsers()
        .then((oldListOfUsers) => {
          _pushability.addUser(_pusher)
          .then( () => {
            _pushability.getUsers()
            .then( (listOfUsers) => {
              expect(listOfUsers.length).toEqual(oldListOfUsers.length);
            });
          });
        });
      }); 

    });
  });
});
