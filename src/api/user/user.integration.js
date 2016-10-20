import app from '../..';
import should from 'should';
import {expect} from 'chai';
import request from 'supertest';
import User from './user.model';
import { default as seedUsers, clear as clearUsers } from './user.seed';


describe('User Model', () => {

    before( seedUsers );

    it('should allow creation of users',  async function() {
      let createdUser = await User.create({
        firstName: "Rick",
        lastName: "Sanchez",
        email: "rick@example.com",
        password_hash: "squelch_but_hashed", // TODO password entry should be via "password" and automatically hashed
        role: "user"
      });
      expect(createdUser).to.have.property('firstName', 'Rick');
      expect(createdUser).to.have.property('lastName', 'Sanchez');

      let allUsers = await User.all()
      expect(allUsers.filter(user => user.firstName == "Rick" && user.lastName == "Sanchez").length).to.equal(1);
    });
});

describe('User API', () => {

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
