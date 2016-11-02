import app from '../..';
import should from 'should';
import {expect} from 'chai';
import request from 'supertest';
import User from './user.model';
import { default as seedUsers, clear as clearUsers } from './user.seed';
import {init, user, admin} from '../auth/local/test.integration'

describe('User Model', () => {

    before( seedUsers );

    it('should allow creation of users',  async function() {
      let createdUser = await User.create({
        firstName: "Rick",
        lastName: "Sanchez",
        email: "rick@morty.com",
        role: "admin",
        password: "squelch_squanch"
      });

      expect(createdUser).to.have.property('firstName', 'Rick');
      expect(createdUser).to.have.property('lastName', 'Sanchez');

      let allUsers = await User.all()
      expect(allUsers.filter(user => user.firstName == "Rick" && user.lastName == "Sanchez").length).to.equal(1);
    });
});

describe.skip('User API', () => {

  describe('should create user', () => {
    // before( clearUsers );

    before( async () => {
      await init()
    });

    it('should authenticate student the endpoint', async function() {
      admin.request(app)
          .get('/api/user')
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
  });

  describe.skip('should create user', () => {
    before( clearUsers );

    let userResponse;
    before(function(done) {
      request(app)
          .post('/api/user')
          .send(requestData)
          .expect(201)
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

      // TODO test that user was created properly
    });

  });
});
