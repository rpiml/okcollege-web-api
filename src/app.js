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
  return new Promise((resolve) => {
    server.listen(config.port, config.ip, function() {
      console.log('Express server listening on %d', config.port);
      resolve();
    });
  });
}

async function start(){
  if (config.seedDB){
    console.log("Seeding!");
    await seed();
  }
  await startServer();
}

let onStart = start();

// Expose app
export default app;
export {
  onStart, server
};
