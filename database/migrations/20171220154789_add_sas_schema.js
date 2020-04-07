exports.up = knex =>
    knex.schema.createTable('sas_schema', table => {

        table.string('bu');
        table.string('meta_library');
        table.string('fact_table');
        table.string('dma_table');
        table.primary('bu');

    });

exports.down = knex => knex.schema.dropTable('sas_schema');
