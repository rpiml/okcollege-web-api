'use strict';

// Development specific configuration
// ==================================
export default {

  serverURL: process.env.DOMAIN || 'http://127.0.0.1:3001',
  database: {
    name: 'okcollege_dev'
  },
};
