import request from 'supertest';
import {expect} from 'chai';
import app from '../../../';
import User from './../../user/user.model';
import { user, admin } from '../../auth/local/test.integration';

describe('Authentication API Tests', () => {

  before(async () => {
    await User.sync({force: true})
  });

  // create a test user
  before(async () => {
    let user = await User.create({
      email: 'test@example.com',
      password: 'testpassword'
    });
    await user.set("firstName", "Bobby");
    await user.set("lastName", "Williams");
    await user.set("role", "admin");
    await user.save();
  });

  it('should have inserted a user', async () => {
    let users = await User.findAll({});
    expect(users.length > 0).to.be.true;
  });

  it('should allow a user to get a token', done => {
    request(app)
      .post('/api/auth/local')
      .type('application/json')
      .send({
        email: "test@example.com",
        password: "testpassword"
      })
      .end((err, res) => {
        expect(res.body.token).to.exist;
        expect(res.body.profile.firstName).to.equal('Bobby');
        expect(res.body.profile.lastName).to.equal('Williams');
        expect(res.body.profile.role).to.equal('admin');
        done();
      });
  });
});
