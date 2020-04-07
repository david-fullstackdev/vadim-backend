exports.up = knex =>
  knex.schema.createTable('weather_stations', table => {
    table.string('station').primary();
    table.float('latitude');
    table.float('longitude');
    table.float('elevation');
    table.string('state');
    table.string('name');
  });

exports.down = knex => knex.schema.dropTable('weather_stations');
