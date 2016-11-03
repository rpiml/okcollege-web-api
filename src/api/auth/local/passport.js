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
    console.log("found user! ", user);
    if (!user) return done({"message":"user not found"});
    let isAuthenticated = await user.authenticate(password);
    if (!isAuthenticated) {
      return done({ message: 'This password is not correct.' }, false);
    } else {
      return done(null, user);
    }
  }));

}
