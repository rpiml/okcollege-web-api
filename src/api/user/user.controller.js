import User from './user.model';

import type {$Response, $Request} from 'express';

export function allUsers(req: $Request, res: $Response){
  // TODO map to some kind of user profile so we don't return critical information
  res.json(User.findAll({}).map(user => user.toJSON()));
}
