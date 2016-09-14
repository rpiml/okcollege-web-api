'use strict';

var express = require('express');
var controller = require('./survey.controller');

var router = express.Router();

router.get('/', controller.submit);

module.exports = router;
