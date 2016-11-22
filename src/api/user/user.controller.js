//@flow
import User from './user.model';

import {signToken} from '../auth/auth.service';
import type {$Response, $Request, NextFunction} from 'express';
import type {$User} from './user.model';

export async function create(req: $Request, res: $Response, next: NextFunction){
  /**
 * Creates a new user
 */

  let newUser = await User.create(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  await newUser.save();
  let profile = newUser.profile();
  let token = signToken(newUser.uuid, newUser.role);
  res.json({ token, profile });

}

/**
 * Returns results for a user's db query
 */
export async function results(req: $Request, res: $Response, next: NextFunction){
  const { userid } = req.params;
  if (userid != req.user.uuid){
    res.status(401).send("unauthorized");
  }
  let user:$User = await User.findOne({ where: { uuid: userid }});
  if (user){
    res.json(user.results);
  }else{
    res.status(404).send("user not found");
  }
}


export async function allUsers(req: $Request, res: $Response, next: NextFunction){
  // TODO map to some kind of user profile so we don't return critical information
  let users = await User.findAll({}).map(user => user.toJSON());
  res.json(users);
}
