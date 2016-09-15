/**
 * Main application routes
 */

'use strict';
import survey from './api/survey';

export default function(app) {
  // Insert routes below
  app.use('/api/survey', survey);

  // All other routes should return not found
  app.route('/*')
    .get((req, res) => {
      res.status(404).json({ error: 'Invalid route' });
    });
}
