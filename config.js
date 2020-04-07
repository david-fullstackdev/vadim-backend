const config = require('dotenv').config().parsed;
// process.env lookups are extremely expensive so we cache it here
const env = Object.assign({ NODE_ENV: 'development' }, config);

module.exports = {
  env: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development' || env.NODE_ENV === 'localtest',
  isTest: env.NODE_ENV.indexOf('test') > -1,
  database: {
    connection: {
      user: env.DB_USER, //env var: PGUSER
      database: env.DB_NAME, //env var: PGDATABASE
      password: env.DB_PASS, //env var: PGPASSWORD
      host: env.DB_HOST, // Server hosting the postgres database
      port: env.DB_PORT, //env var: PGPORT// max number of clients in the pool
      max: env.DB_MAX_CONNECTIONS, // max number of clients in the pool
      idleTimeoutMillis: env.DB_TIMEOUT // how long a client is allowed to remain idle before being closed
    },
  },
  spark: {
    url: env.SPARK_CLIENT_URL,
    username: env.SPARK_CLIENT_USERNAME,
    password: env.SPARK_CLIENT_PASSWORD,
    port: env.SPARK_CLIENT_PORT
  },
  config: env,
};


// config for database
// config for app secret
// config for data location
