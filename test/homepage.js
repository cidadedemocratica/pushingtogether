var expect = require('Chai').expect;
var assert = require('assert');
var request = require('request');

it('homepage should return 200', (done) => {
  request.get('http://localhost:5000', (err, res, body) => {
    expect(res.statusCode).to.equal(200);
    done();
  });
});
