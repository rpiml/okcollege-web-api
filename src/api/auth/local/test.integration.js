import request from 'supertest';
import {expect} from 'chai';
import app from '../../../';
import User from './../../user/user.model';

describe.only('Authentication API Tests', () => {

  before(() => User.sync({force: true}));

  // create a test user
  before(async () => {
    let user = await User.create({
      email: 'test@example.com'
    });
    await user.setPassword("testpassword");
    await user.save();
  });

  it('should have inserted a user', async () => {
    let users = await User.findAll({});
    expect(users.length > 0).to.be.true;
  });

  it('should allow a user to get a token', done => {
    request(app)
      .post('/api/auth/local')
      .type('form')
      .send({
        email: "test@example.com",
        password: "testpassword"
      })
      .end((err, res) => {
        done();
      });
  });
});
