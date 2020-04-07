exports.up = knex =>
  knex.schema.createTable('fact', table => {
    table.string('category').references('category').inTable('category');
    table.integer('week');
    table.float('units');
    table.float('value');
    table.integer('store');
    table.integer('outlet');
    table.string('postalcode');
    table.integer('brand');
    table.integer('item');
    table.json('attributes');
  });

exports.down = knex => knex.schema.dropTable('fact');
