import User from './user.model';

import {signToken} from '../auth/auth.service';
import type {$Response, $Request, NextFunction} from 'express';

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


export async function allUsers(req: $Request, res: $Response, next: NextFunction){
  // TODO map to some kind of user profile so we don't return critical information
  let users = await User.findAll({}).map(user => user.toJSON());
  res.json(users);
}
