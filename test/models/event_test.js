var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');

var Event = models.Event;
var User = models.User;
var Invite = models.Invite;

describe('Event', () => {
  describe('using valid attributes', () => {

    var _owner = null, _event = null;

    beforeEach( (done) => {
      User.create(helper.validUserAttributes)
      .then( (user) => {
        _owner = user;
        _owner.createEvent(helper.validEventAttributes)
        .then( (event) => {
          _event = event;
          done();
        });
      });
    });

    afterEach((done) => {
      _event.destroy()
      .then(() => {
        _owner.destroy()
        .then(() => {
          done();
        });
      });
    });

    it("should increment the Event's counter when event is created", (done) => {
      Event.count()
      .then((oldCounter) => {
        _owner.createEvent(helper.validEventAttributes)
        .then(() => {
          Event.count()
          .then((currentCounter) => {
            expect(currentCounter).toEqual(parseInt(oldCounter) + 1); 
            done();
          });
        });
      });
    });

    describe("event's relations", () => {

      it('should return the event owner', (done) => {
        _event.getOwner()
        .then((owner) => {
          expect(owner.id).toEqual(_owner.id);
          done();
        });
      });

      it('should not be saved without owner', (done) => {
        Event.count()
        .then((oldCounter) => {
          Event.create(helper.validEventAttributes)
          .then(() => {
            Event.count()
            .then((currentCounter) => {
              expect(currentCounter).toEqual(parseInt(oldCounter)); 
              done();
            });
          });
        });
      });

      it('should be deleted when owner is deleted', (done) => {
        Event.count()
        .then((oldCounter) => {
          _owner.destroy()
          .then(() => {
            Event.count()
            .then((currentCounter) => {
              expect(currentCounter).toEqual(parseInt(oldCounter) - 1);
              done();
            });
          });
        });
      });

      it('should increment the number of invited people', (done) => {
        User.create(helper.validUserAttributes)
        .then((user) => {
          user.createEvent(helper.validEventAttributes)
          .then((event) => {
            event.getUsers()
            .then((oldListOfUsers) => {
              event.addUser(user, {
                isNotificationEnabled: false,
                status: Invite.status.CONFIRMED })
              .then(() => {
                event.getUsers()
                .then((listOfUsers) => {
                  expect(listOfUsers.length).toEqual(oldListOfUsers.length + 1);
                  console.log(listOfUsers.length);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});
