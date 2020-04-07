exports.up = knex =>
  knex.schema.createTable('promotion_own', table => {

    table.string('category').references('category').inTable('category');
    table.string("itemid");
    table.string("item_description");
    table.string("brand");
    table.json("attributes");
    table.float("dollars");
    table.float("units");
    table.float("avg_bp");
    table.float("avg_sp");
    table.float("price_elasticity");
    table.string("discount_elasticity");



    table.primary(['category']);

  });

exports.down = knex => knex.schema.dropTable('promotion_own');
