/**
 * Main application routes
 */

'use strict';

export default function(app) {
  // Insert routes below
  app.use('/api/survey', require('./api/survey'));

  // All other routes should return not found
  app.route('/*')
    .get((req, res) => {
      res.status(404).json({ error: 'Invalid route' });
    });
}
