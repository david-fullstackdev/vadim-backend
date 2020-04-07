const { database, config } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    debug: false, // set true to log all queries
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: database.connection,
    pool: { min: 0, max: config.DB_MAX_CONNECTIONS },
    acquireConnectionTimeout: config.DB_TIMEOUT,
  },

  localtest: {
    client: 'pg',
    // debug: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: Object.assign({}, database.connection, {
      database: 'tbdtest'
    }),
  },

  production: {
    client: 'pg',
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/production',
    },
    connection: database.connection,
    pool: { min: 0, max: config.DB_MAX_CONNECTIONS },
    acquireConnectionTimeout: config.DB_TIMEOUT,
  },
};
