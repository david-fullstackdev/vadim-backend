exports.up = knex =>
  knex.schema.createTable('promotion_cross', table => {

    table.string('category').references('category').inTable('category');

    table.string("itemid");
    table.string("item_description");
    table.string("brand");

    table.string("comp_item");
    table.string("comp_description");
    table.string("comp_brand");

    table.float("cross_elasticity");
    table.float("corss_discount");

    table.primary(['category']);

  });

exports.down = knex => knex.schema.dropTable('promotion_cross');
