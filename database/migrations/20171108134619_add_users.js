exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.boolean('admin');

    table.unique('email');
  });

exports.down = knex => knex.schema.dropTable('users');
