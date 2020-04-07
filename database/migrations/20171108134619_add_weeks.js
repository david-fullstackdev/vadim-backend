exports.up = knex =>
    knex.schema.createTable('weeks', table => {
        table.increments('id');
        table.integer('week');
        table.string('date');
        table.integer('month');

        table.unique('week');
    });

exports.down = knex => knex.schema.dropTable('weeks');
