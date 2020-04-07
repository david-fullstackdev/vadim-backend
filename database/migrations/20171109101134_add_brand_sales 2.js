exports.up = knex =>
  knex.schema.createTable('brand_sales', table => {
    table.string('category').references('category').inTable('category');
    table.string('brand');
    table.string('week');
    table.float('units');
    table.float('revenue');

    table.primary(['category', 'brand', 'week']);
  });

exports.down = knex => knex.schema.dropTable('brand_sales');
