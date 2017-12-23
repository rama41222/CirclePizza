let mongoose = require("mongoose");
let User = require('../models/User');
let Account = require('../models/Account');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../api');
let should = chai.should();
let authToken = ""
chai.use(chaiHttp);


//Our parent block
describe('TravelMate', () => {

  /*
   * Test the /GET route
   */
  describe('/GET Travels', () => {
    it('it should GET all the Travel history', (done) => {
      chai.request(server)
        .get('/travels')
        .end((err, res) => {
          let x = { error: 'You are not authorized' }
          res.should.have.status(401);
          res.body.should.be.eql(x);
          done();
        });
    });
  });

  /*
  * Test the /POST route
  */

  describe('/POST LOGIN', () => {
    it('it should LOGIN', (done) => {
      let user = {
        email: "test@test.com",
        password: "test"
      }
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.user._id.should.be.eql('59fc59e7272d4d1a138647b3');
          res.body.should.have.property('token');
          res.body.user.should.have.property('email');
          authToken = res.body.token
          should.not.exist(err);
          console.log(authToken)
          done();
        });59
    });

    /*
    * Test the /GET route
    */

    it('it should GET all the Travel history', (done) => {
      var token = "Bearer "+ authToken.trim()
      var segments = token.split('.');

      if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
      }
      chai.request(server)
        .get('/travels',)
        .set("Authorization", token)
        .end((err, res) => {
        let obj =  {
          id: '1',
          cardid: '11111',
          from: 'Kandy',
          to: 'Colombo',
          time: 'Tue Nov 03 2017 1:52:45',
          totalprice: 320
        }
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.be.eql(obj);
          console.log(res.body)
          done();
        });
    });

      /*
      * Test the /GET route
      */

    it('it should GET all the Balance history', (done) => {
      var token = "Bearer "+ authToken.trim()
      var segments = token.split('.');

      if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
      }
      chai.request(server)
        .get('/balance',)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          console.log(res.body)
          done();
        });
    });

    /*
      * Test the /POST route
    */
    it('it should TOPUP the Travelmate card', (done) => {
      var token = "Bearer "+ authToken.trim()
      var segments = token.split('.');

      if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
      }
      chai.request(server)
        .post('/balance',)
        .set("Authorization", token)
        .send({balance: "120" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('balance');
          console.log(res.body)
          done();
        });
    });
  });
});
