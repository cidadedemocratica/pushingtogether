var expect = require('expect');
var models = require('../../src/models');
var User = models.User;
var Pushability = models.Pushability;
var helper = require('../helper');
var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.PT_PORT = 5486;
var server = require('../../app');

chai.use(chaiHttp);

describe('EventControllerTest', function() {

  var _user = null;
  var _conversationId = 'conversationIdTest'

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
        Pushability.create(helper.validPushabilityAttributes)
        .then( (pushability) => {
          _pushability = pushability;
          done();
        });
      });

      it('event can be created by users with an active pushability', (done) => {
        chai.request(server)
        .post("/api/v1/events/")
        .set('facebookToken', _user.facebookToken)
        .send(helper.validEventCreateParams)
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
        });
      });
    });
  });
});
