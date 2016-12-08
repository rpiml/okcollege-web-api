'use strict';

import path from 'path';
import _ from 'lodash';
import production from './production.js';
import development from './development.js';

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Server port
  port: process.env.PORT || 3001,

  // RabbitMQ Address
  rabbitmqAddress: `amqp://rabbitmq:rabbitmq@${process.env['RABBITMQ_HOST'] || '127.0.0.1'}`,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Server base e.g. http://malik.ml.rpi.edu:3001
  serverURL: process.env.DOMAIN,

  // Grab environment variable for postgresql host
  PGHOST : process.env.PG_HOST || 'localhost',

  // Secret for session
  secrets: {
    session: process.env.OKC_SECRET || 'okcollege-secret'
  },

};

var node_env = process.env.NODE_ENV == "production" ? production : development;

// Export the config object based on the NODE_ENV
// ==============================================
export default  _.merge(
  all,
  node_env || {}
);
