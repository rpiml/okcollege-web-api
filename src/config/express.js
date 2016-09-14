/**
 * Express configuration
 */

'use strict';

import morgan from 'morgan';
import bodyParser from 'body-parser';

export default function(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

}
