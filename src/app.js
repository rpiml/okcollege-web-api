/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
import routes from './routes'
import expressConfig from './config/express'
import db from './db';

// Setup server
var app = express();
var server = http.createServer(app);
express(app);
expressConfig(app);
routes(app);

// Start the server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d', config.port);
  });
}

// Connect to a database
db.connect().then(startServer);

// startServer()

// Expose app
export default app;
