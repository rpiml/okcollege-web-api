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
          9000,
  database: {
    name: 'okcollege'
  },

  seedDB: false

};
