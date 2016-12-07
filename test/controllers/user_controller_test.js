var expect = require('expect');
var models = require('../../src/models');
var helper = require('../helper');
var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.PT_PORT = 5486;
var server = require('../../app');
const status = require('./../../src/utils/http_status_codes');

chai.use(chaiHttp);

describe('UsersControllerTest', function() {

  var _user = null;

  beforeEach( function(done) {
    models.sequelize.sync({force:true}).then(() => {
      models.User.create(helper.validUserAttributes)
      .then(function(user) {
        _user = user;
        done();
      });
    });
  });


  describe('/DELETE:id users', function() {
    describe('The user is authenticated', function() {

      it('a user should be able to destroy itself', function(done) {
        models.User.count()
        .then(function(usersCount) {
          chai.request(server)
          .delete("/api/v1/users/" + _user.id)
          .set('facebookToken', _user.facebookToken)
          .end(function (err, res) {
            models.User.count()
            .then(function(count) {
              expect(res.status).toBe(status.OK);
              expect(count).toBe(usersCount-1);
              done();
            });
          });
        });
      });

      it('a user should not be able to destroy others', function(done) {
        helper.createUser("other")
        .then(function(otherUser) {
          chai.request(server)
          .delete("/api/v1/users/" + otherUser.id)
          .set('facebookToken', _user.facebookToken)
          .end(function (err, res) {
            expect(res.status).toBe(status.NOT_FOUND);
            done();
          });
        });
      });
    });

    describe('The user is not authenticated', function() {
    });
  });
});
