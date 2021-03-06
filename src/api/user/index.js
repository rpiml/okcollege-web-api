'use strict';

import express from 'express'
import * as controller from './user.controller'
import * as auth from '../auth/auth.service';

let router = express.Router();

// TODO authenticate
router.get('/', auth.isAuthenticated(), controller.allUsers);
router.get('/:userid/results', auth.isAuthenticated(), controller.results);
router.post('/',controller.create);

export default router;
