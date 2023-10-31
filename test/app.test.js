const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app'); // Import your app.js file here

chai.use(chaiHttp);

describe('App', function () {
  it('should return "Hello, DevOps!" when accessing root URL', function (done) {
    chai
      .request(app)
      .get('/')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Hello, DevOps!');
        done();
      });
  });
});
