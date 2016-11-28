/**
 * Express configuration
 */

'use strict';

import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

export default function(app) {
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(morgan('dev'));
  app.use(cookieParser())
}
