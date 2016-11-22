import app from '../..';
import should from 'should';
import {expect} from 'chai';
import request from 'supertest';
import User from './user.model';
import { default as seedUsers, clear as clearUsers } from './user.seed';
import {init as initSeed, user, admin, getUserAuthHandler} from '../auth/local/test.integration'

let rick = {
  firstName: "Rick",
  lastName: "Sanchez",
  email: "rick@morty.com",
  role: "admin",
  password: "squelch_squanch",
  results: {a: 1}
};
describe('User Model', () => {

    let createdUser;

    before(async ()=> {
      createdUser = await User.create(rick)
    });

    it('should allow creation of users',  async function() {
      expect(createdUser).to.have.property('firstName', 'Rick');
      expect(createdUser).to.have.property('lastName', 'Sanchez');

      let retrievedUser = await User.findOne({where:{email:"rick@morty.com"}});
      expect(retrievedUser).to.not.be.undefined;
      expect(retrievedUser.firstName).to.equal("Rick");
      expect(retrievedUser.lastName).to.equal("Sanchez");
    });

});

describe('User API', () => {

  describe('user auth', () => {

    it('should authenticate user endpoint', (done) => {
      admin.request(app)
          .get('/api/user')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              done();
          });
    });

    it('should not allow unauthenticate user at endpoint', (done) => {
      request(app)
      .get('/api/user')
      .expect(401)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

  });


  it('should create user', () => {
    before( clearUsers );

    let userResponse;
    before(function(done) {
      request(app)
          .post('/api/user')
          .send(rick)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              userResponse = res.body;
              done();
          });
    });


    it('should have placed the user in the relevant database tables', async function() {
      let user = (await User.findAll({limit: 1, order: [ ['createdAt', 'DESC'] ]}))[0];
      expect(user).to.have.property('firstName');
      expect(user.firstName).to.equal(rick.firstName);
      // TODO test that user was created properly
    });

  });

});

describe('User API Results', () => {
  let rickAuth;
  let rickUser;

  before( clearUsers );

  before( initSeed );

  before(async () => {
    rickUser = await User.create(rick)
  });

  before(async () => {
    rickAuth = await getUserAuthHandler(rick);
  });

  it('should allow user to retrieve results', done=>{
    rickAuth.request(app)
    .get(`/api/user/${rickUser.uuid}/results`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      expect(res.body).to.deep.equal(rick.results);
      done();
    });
  });

  it('shouldn\'t allow a user to retrieve another user\'s results', done=>{
    user.request(app)
    .get(`/api/user/${rickUser.uuid}/results`)
    .end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
});
