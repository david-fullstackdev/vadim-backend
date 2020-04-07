const config = require('../config');
const pg = require('pg');

// create the connection pool
const pool = new pg.Pool(config.database.connection);

module.exports = {
  pool: pool
};
