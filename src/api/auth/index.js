import express from 'express';
import passport from 'passport';
import config from '../../config/environment';
import User from '../user/user.model';

import {localSetup} from './local/passport';
import localEndpoint from './local';

localSetup();

let router = express.Router();

router.use('/local', localEndpoint);

export default router;
