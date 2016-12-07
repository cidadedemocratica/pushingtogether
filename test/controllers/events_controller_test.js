var expect = require('expect');
var models = require('../../src/models');
var User = models.User;
var Pushability = models.Pushability;
var helper = require('../helper');
var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.PT_PORT = 5486;
var server = require('../../app');
const status = require('./../../src/utils/http_status_codes');

chai.use(chaiHttp);

describe('EventControllerTest', function() {

  var _user = null;
  var _conversation = null;

  beforeEach( (done) => {
    models.sequelize.sync({force: true})
    .then(() => {
      User.create(helper.validUserAttributes)
      .then( (user) => {
        _user = user;
        done();
      });
    });
  });

  describe('/CREATE events', () => {
    describe('The user is authenticated', () => {

      var _pushability = null;

      beforeEach( (done) => {
        _user.createConversation(helper.validConversationAttributes)
        .then((conversation) => {
          _conversation = conversation;
          Pushability.create(helper.validPushabilityAttributes)
          .then( (pushability) => {
            _pushability = pushability;
            pushability.setConversation(conversation)
            .then(() => {
              done();
            });
          });
        });
      });

      it('event cannot be created by users with an active pushability', (done) => {
        chai.request(server)
        .post("/api/v1/events/")
        .set('facebookToken', _user.facebookToken)
        .send(helper.validEventAttributes) // without conversation id
        .end((err, res) => {
          expect(res.status).toBe(status.BAD_REQUEST);
          done();
        });
      });

      it('event can be created by users with an active pushability', (done) => {
        chai.request(server)
        .post("/api/v1/events/")
        .set('facebookToken', _user.facebookToken)
        .send({
          title: "Test Event",
          description: "Description Test Description Test",
          address: "Address Test",
          date: Date.now(),
          conversationId: _conversation.id
        })
        .end((err, res) => {
          expect(res.status).toBe(status.OK);
          done();
        });
      });
    });
  });
});
