'use strict';

import * as controller from './survey.controller'
import express from 'express'

var router = express.Router();

router.get('/', controller.submit);

export default router;
