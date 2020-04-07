exports.up = knex =>
    knex.schema.createTable('sas_templates', table => {

        table.string('name');
        table.text('template');
        table.primary('name');

    });

exports.down = knex => knex.schema.dropTable('sas_templates');
