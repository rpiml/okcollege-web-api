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
    await user.set("firstName", "Malik");
    await user.set("lastName", "Magdon-Ismail");
    await user.set("role", "Boss");
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
        expect(res.body.token).to.exist;
        expect(res.body.profile.firstName).to.equal('Malik');
        expect(res.body.profile.lastName).to.equal('Magdon-Ismail');
        expect(res.body.profile.role).to.equal('Boss');
        done();
      });
  });
});
