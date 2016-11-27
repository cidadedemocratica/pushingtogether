var expect = require('Chai').expect;
var request = require('request');

it('should list ALL users on /api/v1/events using GET', (done) => {
  request.get('http://localhost:5000/api/v1/users', (err, res, body) => {

    expect(res.statusCode).to.equal(200);
    expect(body).to.equal("[]");
    done();

  });
});
