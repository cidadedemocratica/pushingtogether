var expect = require('expect');
var models = require('../../src/models');
var User = models.User;
var Invite = models.Invite;
var helper = require('../helper');
var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.PT_PORT = 5486;
var server = require('../../app');
const status = require('./../../src/utils/http_status_codes');

chai.use(chaiHttp);

describe('EventControllerTest', function() {

  var _owner = null, _event = null, _user = null;

  beforeEach( (done) => {
    models.sequelize.sync({force: true})
    .then(() => {
      User.create(helper.validUserAttributes)
      .then( (user) => {
        _owner = user;
        _owner.createEvent(helper.validEventAttributes)
        .then((event) => {
          _event = event;
          User.create(helper.validOtherUserAttributes)
          .then((otherUser) => {
            _user = otherUser;
            event.addUser(otherUser, {status: Invite.status.PENDING})
            .then(() => {
              done();
            });
          });
        });
      });
    });
  });

  describe('/ACCEPT invite', () => {
    describe('The user is authenticated', () => {

      it('user can accept an invite', (done) => {
        chai.request(server)
        .post("/api/v1/events/" + _event.id + "/accept")
        .set('facebookToken', _user.facebookToken)
        .end((err, res) => {
          expect(res.status).toBe(status.OK);
          done();
        });
      });

    });
  });
});
