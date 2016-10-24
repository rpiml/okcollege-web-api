/**
 * Main application routes
 */

'use strict';
import survey from './api/survey';
import auth from './api/auth';

export default function(app) {
  // Insert routes below
  app.use('/api/survey', survey);
  // app.use('/api/auth', auth);

  // All other routes should return not found
  app.route('/*')
    .get((req, res) => {
      res.status(404).json({ error: 'Invalid route' });
    });
}
