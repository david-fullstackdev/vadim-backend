exports.up = knex =>
  knex.schema.createTable('category_sales', table => {
    table.string('category').references('category').inTable('category');
    table.integer('week');
    table.float('units');
    table.float('revenue');
    table.primary(['category', 'week']);
  });

exports.down = knex => knex.schema.dropTable('category_sales');
