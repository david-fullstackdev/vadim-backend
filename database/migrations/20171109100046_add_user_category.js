exports.up = knex =>
  knex.schema.createTable('user_category', table => {
    table.increments('id');
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('category_id').references('id').inTable('category');
  });

exports.down = knex => knex.schema.dropTable('user_category');
