
const omit = require('lodash/omit');
const pool = require('../../database/database').pool;


class UserService {

  constructor() {

  }

  get_cross(category) {
    const sql = `SELECT * FROM promotion_cross WHERE category LIKE $1 `;
    return pool.query(sql, [category]).then(result => result.rows.map(row => omit(row, 'password')));
  }

  get_own(category) {
    const sql = `SELECT * FROM promotion_own WHERE category LIKE $1 `;
    return pool.query(sql, [category]).then(result => result.rows.map(row => omit(row, 'password')));
  }

  get_dt(category) {
    const sql = `SELECT * FROM promotion_dt WHERE category LIKE $1`;
    return pool.query(sql, [category]).then(result => result.rows.map(row => omit(row, 'password')));
  }


}


module.exports = UserService;