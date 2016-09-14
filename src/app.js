/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';

// Setup server
var app = express();
var server = http.createServer(app);
console.log('Working 1');
require('./config/express').default(app);
console.log('Working 2');
require('./routes').default(app);
console.log('Working 3');


// Connect to a database

// Start the server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d', config.port);
  });
}

startServer()

// Expose app
exports = module.exports = app;
