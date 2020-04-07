
const pool = require('../../database/database').pool;
const { spawn } = require('child_process');


class CategoryService {

  constructor() {

  }

  get(category) {
    return pool.query("SELECT * FROM category WHERE category LIKE $1", [category])
  }

  post(body) {
    const sql = `
      INSERT INTO category (category, display_name) 
      VALUES ($1, $2) RETURNING category.*
    `;

    return pool.query(sql, [body.category, body.display_name])
  }

  del(id) {
    return pool.query("DELETE FROM category WHERE id = $1 RETURNING category.*", [id])
  }

  get_all() {
    return pool.query("SELECT * FROM category")
  }

  put(body) {
    const sql = `
      UPDATE category SET category=$1, display_name=$2 
      WHERE id = $3 RETURNING category.*
    `;

    return pool.query(sql, [body.category, body.display_name, body.id])
  }

  extract_category(body) {
    return new Promise(function (resolve, reject) {
      const bat = spawn('cmd.exe', ['/c', 'my.bat']);
      if(1.0<2.0) {
        resolve()
      }
      else {
        reject()
      }
    })
  }

  get_sales(category) {
    return pool.query('SELECT * FROM category_sales JOIN weeks ON category_sales.week=weeks.week WHERE category LIKE $1', [category])
  }



}

module.exports = CategoryService;

