const wipeDb = require('./db-wiper');
const runMigrations = require('./migration-runner');
const knex = require('./index');

// Drop all tables, run migrations, then seed
function reset() {
  return wipeDb().then(runMigrations).then(() => knex.seed.run());
}

// If run from the CLI, close the db connection after reset to allow the process to terminate
function resetFromCLI() {
  reset().then(() => knex.destroy());
}

module.exports = {
  reset,
  resetFromCLI,
};
