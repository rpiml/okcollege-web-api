/**
 * Main application routes
 */

'use strict';
import survey from './api/survey';
import user from './api/user';
import auth from './api/auth';

export default function(app) {
  // Insert routes below
  app.get('/', (_,res) => res.send("okcollege server api"));
  app.use('/api/survey', survey);
  app.use('/api/auth', auth);
  app.use('/api/user', user);

  // All other routes should return not found
  app.route('/*')
    .get((req, res) => {
      res.status(404).json({ error: 'Invalid route' });
    });
}
