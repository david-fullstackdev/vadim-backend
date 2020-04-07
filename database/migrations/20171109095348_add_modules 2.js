exports.up = knex =>
  knex.schema.createTable('modules', table => {
    table.string('module').primary();
    table.string('display_name');
  });

exports.down = knex => knex.schema.dropTable('modules');
