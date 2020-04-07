exports.up = knex =>
    knex.schema.createTable('dma_sales', table => {
        table.string('category').references('category').inTable('category');
        table.string('dma');
        table.integer('week');
        table.float('units');
        table.float('revenue');
        table.primary(['category', 'dma', 'week']);
    });

exports.down = knex => knex.schema.dropTable('dma_sales');
