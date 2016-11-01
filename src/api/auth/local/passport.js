import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './../../user/user.model';

export function localSetup() {

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, async (email, password, done) => {
    let user = await User.findOne({where: { email: email.toLowerCase() }});
    if (!user) return done(null, {"message":"user not found"});
    let isAuthenticated = await user.authenticate(password);
    if (!isAuthenticated) {
      return done(null, false, { message: 'This password is not correct.' });
    } else {
      return done(null, user);
    }
  }));

}
