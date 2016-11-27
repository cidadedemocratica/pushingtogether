var expect = require('Chai').expect;
var request = require('request');

it('should list ALL users on /api/v1/events using GET', (done) => {
  request.get('http://localhost:5000/api/v1/events', (err, res, body) => {

    expect(res.statusCode).to.equal(200);
    expect(body).to.equal(JSON.stringify({events:[{action:'update event', id:2, name:'Maurilio Atila'},{action:'update event', id:2, name:'Henrique Parra'}]}));
    done();

  });
});
