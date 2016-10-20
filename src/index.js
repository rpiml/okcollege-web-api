'use strict';

import 'babel-polyfill';
import app from './app';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Export the application
export default app;
