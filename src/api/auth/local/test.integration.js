import request from 'supertest';
import app from '../../../';
import User from './../../user/user.model';

describe.only('Authentication API Tests', () => {

  // create a test user
  before(async () => {
    let user = await User.create({
      email: 'test@example.com'
    });
    await user.setPassword("testpassword");
    await user.save();
  });

  it('should allow a user to get a token', done => {
    request(app)
      .post('/api/auth/local')
      .field('email', 'test@example.com')
      .field('password', 'testpassword')
      .end((err, res) => {
        console.log("aye", res.statusCode, res.text);
        done();
      });
  });
});
