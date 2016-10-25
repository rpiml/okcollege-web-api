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
import seed from './config/seed';

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

async function start(){
  // FIXME for some reason start server can't be moved after any awaits or
  // callbacks, this may be an issue with the generation, for now we'll
  // put it on top
  startServer();
  if (config.seedDB){
    await seed();
  }
}

start();

// Expose app
export default app;
