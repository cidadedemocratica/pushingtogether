var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');

var Pushability = models.Pushability;
var User = models.User;

describe('Pushability', () => {
  describe('Check pushability relations', () => {
    describe('Using valid attributes', () => {
      var _pusher = null, _pushability = null;

      beforeEach( (done) => {
        User.create(helper.validUserAttributes)
        .then( (user) => {
          user.createPushability(helper.validPushabilitytAttributes)
          .then( (pushability) => {
            _pushability = pushability;
            _pusher = user;
          }).then(done);
        });
      });

      afterEach( (done) => {
        User.destroy({
          where: { id: _pusher.id }
        })
        .then( (rows) => {
          expect(rows).toExist();
          done();
        });
      });

      it("should return all pushability a user has", (done) => {
        _pusher.getPushabilities()
        .then((oldListOfPushabilities) => {
          _pusher.createPushability(helper.validPushabilitytAttributes)
          .then( (pushability) => {
            _pusher.getPushabilities()
            .then( (listOfPushabilities) => {
              expect(listOfPushabilities.length).toEqual(oldListOfPushabilities.length + 1);
            }).then(done);
          });
        });
      });

      it("should add some user as a target", (done) => {
        _pushability.getUsers()
        .then((oldListOfUsers) => {
          _pushability.addUser(_pusher)
          .then( () => {
            _pushability.getUsers()
            .then( (listOfUsers) => {
              expect(listOfUsers.length).toEqual(oldListOfUsers.length + 1);
              done();
            });
          });
        });
      }); 

    });
  });
});
