import request from 'supertest';
import app from '../../../';
import User from './../../user/user.model';

describe('Authentication API Tests', () => {

  // create a test user
  before(async () => {
    let user = await User.create({
      email: 'test@example.com'
    });
    await user.setPassword("testpassword");
    await user.save();
  });

  it('should allow a user to get a token', () => {

  });
});
