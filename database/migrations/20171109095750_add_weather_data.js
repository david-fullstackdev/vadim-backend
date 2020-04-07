exports.up = knex =>
  knex.schema.createTable('weather_data', table => {
    table.string('station');
    table.string('date');
    table.string('type');
    table.float('value');

    table.primary(['station', 'date', 'type']);
  });

exports.down = knex => knex.schema.dropTable('weather_data');
