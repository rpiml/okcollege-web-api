import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './../../user/user.model';

export function localSetup() {

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },(email, password, done) => {
    User.findOne({
      where: { email: email.toLowerCase() }
    }).then(user => {
      if (!user) return cb(null, {"message":"user not found"});

      user.authenticate(password).then((authError, authenticated)=>{
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    });
  }));

}
