'use strict';

import app from './app';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Export the application
exports = module.exports = app;
