const knex = require('./index');

function runMigrations() {
  console.log('Checking for database migrations..');
  return knex.migrate
    .latest()
    .then(result => {
      console.log('Ran', result[1].length, 'migration(s)');
      return knex.migrate.currentVersion();
    })
    .then(version => console.log('Current version of database: ', version));
}

// automatically run migrations
module.exports = runMigrations;
