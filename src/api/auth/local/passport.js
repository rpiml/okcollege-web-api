import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './../../user/user.model';

export function localSetup() {

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },(email, password, cb) => {
    User.findOne({
      where: { email: email.toLowerCase() }
    }).then(user => {
      if (err) return cb(err);
      if (!user) return cb(null, err);

      user.authenticate(password, function(authError, authenticated) {
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
