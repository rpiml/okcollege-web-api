/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
import routes from './routes'


// Setup server
var app = express();
var server = http.createServer(app);
express(app);
routes(app);


// Connect to a database

// Start the server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d', config.port);
  });
}

startServer()

// Expose app
export default app;
