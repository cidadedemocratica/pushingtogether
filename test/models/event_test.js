var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');

var Event = models.Event;
var User = models.User;
var Invite = models.Invite;

describe('Event', function() {
  describe('using valid attributes', function() {

    var _owner = null, _event = null;

    beforeEach( function(done) {
      User.create(helper.validUserAttributes)
      .then( function(user) {
        _owner = user;
        _owner.createEvent(helper.validEventAttributes)
        .then( function(event){
            _event = event;
            done();
        });
      });
    });

    afterEach(function(done) {
      _event.destroy()
      .then(function() {
        _owner.destroy()
        .then(function() {
          done();
        });
      });
    });

    it("should increment the Event's counter when event is created", function(done) {
      Event.count()
      .then(function(oldCounter) {
        _owner.createEvent(helper.validEventAttributes)
        .then(function(){
          Event.count()
          .then(function(currentCounter) {
            expect(currentCounter).toEqual(parseInt(oldCounter) + 1); 
            done();
          });
        });
      });
    });

    describe("event's relations", function() {

      it('should return the event owner', function(done) {
        _event.getOwner()
        .then(function(owner) {
          expect(owner.id).toEqual(_owner.id);
          done();
        });
      });

      it('should not be saved without owner', function(done) {
        Event.count()
        .then(function(oldCounter) {
          Event.create(helper.validEventAttributes)
          .then(function(){
            Event.count()
            .then(function(currentCounter) {
              expect(currentCounter).toEqual(parseInt(oldCounter)); 
              done();
            });
          });
        });
      });

      it('should be deleted when owner is deleted', function(done) {
        Event.count()
        .then(function(oldCounter) {
          _owner.destroy()
          .then(function() {
            Event.count()
            .then(function(currentCounter) {
              expect(currentCounter).toEqual(parseInt(oldCounter) - 1);
              done();
            });
          });
        });
      });

      it('should increment the number of invited people', function(done) {
        User.create(helper.validUserAttributes)
        .then(function(user) {
          user.createEvent(helper.validEventAttributes)
          .then(function(event){
            event.getUsers()
            .then(function(oldListOfUsers) {
              event.addUser(user, {
                isNotificationEnabled: false,
                status: Invite.status.CONFIRMED })
              .then(function () {
                event.getUsers()
                .then(function (listOfUsers) {
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
