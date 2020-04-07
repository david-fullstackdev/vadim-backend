exports.up = knex =>
  knex.schema.createTable('promotion_dt', table => {

    table.string('category').references('category').inTable('category');
    table.string("itemid");
    table.string("item_description");
    table.string("brand");
    table.string("geography");
    table.string("week");
    table.float("units");
    table.float("promo_units");
    table.float("promo_dollars");
    table.float("avg_bp");
    table.float("avg_sp");
    table.float("avg_discount");
    table.float("bp_dt");
    table.float("discount_dt");
    table.float("comp_dt");
    table.float("seasonality_dt");



  });

exports.down = knex => knex.schema.dropTable('promotion_dt');
