'use strict';

import controller from './survey.controller'
import express from 'express'

var router = express.Router();

router.get('/', controller.submit);

module.exports = router;
