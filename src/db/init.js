import config from '../config/environment';
import pg from 'pg';

const postgresConfig = {
  max: 1,
  user: 'postgres',
  database: 'postgres',
  password: '',
  host: config.database.host,
  port: 5432,
  idleTimeoutMillis: 500,
};

/**
 * If database specified in the config does not exist, connect to the
 * default "postgres" database and create the config database.
 * @return {Promise}
 **/
export default function initDatabase() {
  return new Promise((resolve, reject) => {
    console.log(`Creating new ${config.database.name} database.`);
    let pool = new pg.Pool(postgresConfig);
    pool.connect((err, client_, done) => {
      if (err) return reject(err);
      let client = client_;
      client.query(`CREATE DATABASE ${config.database.name}`, (err, results) => {
        if (err) return reject(err);
        client.end(err => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  });
}

if (!module.parent){
  initDatabase().then(() => {
    console.log(`Database successfully initialized`);
    process.exit();
  }).catch((err) => {
    console.log("Database creation failed with...\n\n", err);
    process.exit();
  })
}
