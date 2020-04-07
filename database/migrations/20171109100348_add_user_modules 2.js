exports.up = knex =>
  knex.schema.createTable('user_modules', table => {
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.string('module').references('module').inTable('modules');
  });

exports.down = knex => knex.schema.dropTable('user_modules');
