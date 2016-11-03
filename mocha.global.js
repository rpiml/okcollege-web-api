import {default as app, server} from './src';
import db from './src/db';

after(function(done) {
  server.on('close', () => done());
  db.close();
  server.close();
});
