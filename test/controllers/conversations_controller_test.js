var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');
var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.PT_PORT = 5486;
var server = require('../../app');

var User = models.User;
var Conversation = models.Conversation;

chai.use(chaiHttp);

describe('Conversations Controller', function() {

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

  describe('/CREATE conversation', () => {
    describe('The user is authenticated', () => {

      it('Conversation should be created with valid attributes', (done) => {
        chai.request(server)
        .post("/api/v1/conversations/")
        .set('facebookToken', _user.facebookToken)
        .send(helper.validConversationAttributes)
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
        });
      });

    });
  });
});
