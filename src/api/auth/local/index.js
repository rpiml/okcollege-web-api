'use strict';

import express from 'express';
import passport from 'passport';
import User from "../../user/user.model";
// import {signToken} from '../auth.service';

let router = express.Router();

router.get('/', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err){
      return res.status(401).json(err);
    }else{
      
    }
  });
});

export default router;
