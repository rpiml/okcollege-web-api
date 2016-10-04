/**
 * Internal module for database queries
 **/

import pg from 'pg';
import configEnv from '../config/environment';

var config = {
  user: 'postgres', //env var: PGUSER
  database: configEnv.database.name, //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  host: 'postgres', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 4, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

let pool = null;

let client = null;

let connected = false;

/**
 * Query the client database with a SQL query.
 * @param  {String} query String to query
 * @param  {[String]} args Query arguments, interpolated with $1,$2... OPTIONAL
 * @return {Promise}
 */
function queryClient(...args){
  return new Promise((resolve, reject) => {
    if (!connected) return reject("Client not connected");
    client.query(...args, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

/**
 * Initialize tables to be used by database.
 * @return {Promise}
 */
function initTables(){
  return queryClient(`CREATE TABLE survey_responses (
      id varchar(80),
      content varchar(3000)
    )`).catch((err) => {
      if (err.code == '42P07') return; // Ignore "Record already exists"
      throw err;
    });
}

/**
 * If database specified in the config does not exist, connect to the
 * default "postgres" database and create the config database.
 * @return {Promise}
 */
function initDatabase(){
  return new Promise((resolve, reject) => {
    console.log(`Creating new ${config.database} database.`);
    var postgresConfig = Object.assign({}, config);
    postgresConfig.database = configEnv.database.name; //configEnv.database.name
    pool = new pg.Pool(postgresConfig);
    pool.connect((err, client_, done) => {
      if (err) return reject(err);
      client = client_;
      client.query(`CREATE DATABASE ${config.database}`, (err, results) => {
        if (err) return reject(err);
        disconnect().then(resolve);
      });
    });
  });
}

/**
 * Connects to database (creating the database if it doesn't exist) and
 * initializes tables.
 * @return {Promise}
 */
function connect() {
  return new Promise((resolve, reject) => {
    if (connected) return resolve();
    pool = new pg.Pool(config);
    pool.on('error', function (err, client) {
     connected = false;
     console.error(err);
    });
    pool.connect((err, client_, done) => {
      if (err && err.code == '3D000') return initDatabase().then(connect);
      if (err) return reject(err);
      connected = true;
      client = client_;
      initTables().then(resolve).catch(reject).then(done);
    });
  });
}

/**
 * Add survey response to database.
 * @param {Object} response Should contain the id of the submission as well as
 * the content.
 * Example response object:
 * {
 *  'id': 'ASD87HJUR7',
 *  'content': "[{'qid': 1, 'answer': 'fishing'}]"
 * }
 * @return {Promise}
 */
function addSurveyResponse(response){
  if (!response || !response.id || !response.content) return Promise.reject("Malformatted response");
  return queryClient(`INSERT INTO survey_responses (id, content) VALUES ($1,$2)`, [
    response.id,
    JSON.stringify(response.content)
  ]);
}

/**
 * Gets all survey response JSON from database.
 * @return {Promise}
 */
function getSurveyResponses(){
  return queryClient(`SELECT * FROM survey_responses`).then(results => results.rows.map(row=>{
    return {'id':row.id, 'content':JSON.parse(row.content)}
  }));
}

/**
 * Wipe/Drop the tables in the database.
 * @return {Promise}
 */
function wipe(){
  return queryClient(`DROP TABLE survey_responses`).catch(err =>{
    if (err.code == '42P07') return; // Ignore no table exists
    throw err;
  });
}

/**
 * Disconnect from the database.
 * @return {Promise}
 */
function disconnect(){
  return new Promise((resolve, reject) => {
    connected = false;
    client.end((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export default { connect, disconnect, addSurveyResponse, getSurveyResponses, wipe, initTables, config };
