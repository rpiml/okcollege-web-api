'use strict';

// Production specific configuration
// =================================
export default {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          3001,
  database: {
    name: 'okcollege',
    host: process.env.PG_HOST || 'localhost'
  },

  seedDB: false

};
