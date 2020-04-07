
const pool = require('../../database/database').pool;


class ModuleService {

  constructor() {

  }

  get(module) {
    return pool.query("SELECT * FROM modules WHERE module LIKE $1", [module])
  }

  get_all(module) {
    return pool.query("SELECT * FROM modules")
  }

  post(module) {
    return pool.query("INSERT INTO modules (module) VALUES ($1) RETURNING *", [module])
  }

  del(module) {
    return pool.query("DELETE FROM modules WHERE module LIKE $1 RETURNING *", [module])
  }

}


module.exports = ModuleService;