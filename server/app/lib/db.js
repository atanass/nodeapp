const pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'postgres', //env var: PGDATABASE 
  host: 'postgres-service', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};
const pool = new pg.Pool(config);
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});
 
//export the query method for passing queries to the pool 
module.exports.query = function (text, values, callback) {
  return pool.query(text, values, callback);
};
 
// the pool also supports checking out a client for 
// multiple operations, such as a transaction 
module.exports.connect = function (callback) {
  return pool.connect(callback);
};
