'use strict';

import express from 'express';
import passport from 'passport';
import User from "../../user/user.model";
import {signToken} from '../auth.service';

let router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err){
      return res.status(401).json(err);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    let profile = user.profile();
    let token = signToken(user.uuid, user.role);
    res.json({ token, profile });

  })(req, res, next);
});

export default router;
