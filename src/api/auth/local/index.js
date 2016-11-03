'use strict';

import express from 'express';
import passport from 'passport';
import User from "../../user/user.model";
import {signToken} from '../auth.service';

let router = express.Router();

router.post('/', (req, res, next) => {
  console.log("I hear ya", req.body['email'], req.body['password']);
  passport.authenticate('local', (err, user, info) => {
    console.log("AHHHHHHHH", user);
    if (err){
      console.log("FUFUFU");
      return res.status(401).json(err);
    }
    if (!user) {
      console.log("WHO ARE YOU");
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    console.log("teriyaki");
    let profile = user.profile();
    let token = signToken(user.uuid, user.role);
    console.log("have a great day");
    res.json({ token, profile });

  })(req, res, next);
});

export default router;
