exports.up = knex =>
  knex.schema.createTable('imt_jobs', table => {

    table.increments("id");
    table.string("start_date");
    table.string("end_date");
    table.string("id_list");
    table.string("business_unit")


  });

exports.down = knex => knex.schema.dropTable('jobs');
