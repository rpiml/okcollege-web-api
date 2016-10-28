'use strict';

import express from 'express';
import passport from 'passport';
import User from "../../user/user.model";
// import {signToken} from '../auth.service';

let router = express.Router();

router.post('/', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err){
      return res.status(401).json(err);
    }else{
      console.log(user);
      res.send("It worked!?!");
    }
  })(req, res, next);
});

export default router;
