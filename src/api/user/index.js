'use strict';

import * as controller from './user.controller'
import express from 'express'

let router = express.Router();

// TODO authenticate
router.get('/', controller.allUsers);

export default router;
