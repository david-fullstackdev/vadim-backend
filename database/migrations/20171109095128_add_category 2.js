exports.up = knex =>
  knex.schema.createTable('category', table => {
    table.increments('id');
    table.string('category');
    table.string('sas_table_name');
    table.string('category_filter');
    table.string('display_name');
    table.string('status');
    table.string('extract_date');
    table.unique('category');
  });

exports.down = knex => knex.schema.dropTable('category');
