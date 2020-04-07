const omit = require('lodash/omit');
const difference = require('lodash/difference');
const pool = require('../../database/database').pool;
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const saltRounds = 10;
const query = (sql, params) => pool.query(sql, params).then(result => result.rows);

class UserService {

  constructor() {

  }

  async signup(first_name, last_name, email, password) {
    const hash = await bcrypt.hash(password, saltRounds);
    const sql = `
      INSERT INTO users (first_name, last_name, email, password, admin) 
      VALUES ($1,$2,$3,$4,false) 
      RETURNING id, first_name, last_name, email
    `;

    return pool.query(sql, [first_name, last_name, email, hash]);
  }

  async login(email, password) {
    const result = await pool.query("SELECT * FROM users WHERE email LIKE $1", [email]);
    const user = result.rows[0] || {};
    const match = user.password && await bcrypt.compare(password, user.password);
    const error = new Error('User not found or incorrect password');
    error.code = 400;

    if (!user || !match) throw error;

    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
    return {
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      admin: user.admin,
      token: token,
    };
  }

  del(id) {
    return pool.query("DELETE FROM users WHERE id = $1 RETURNING users.*", [id])
  }

  async put(body) {
    const hash = await bcrypt.hash(body.password, saltRounds);
    const sql = `
      UPDATE users 
      SET email=$2, first_name=$3, last_name=$4${body.password ? ', password=$5' : ''} 
      WHERE id = $1 RETURNING id, first_name, last_name, email
    `;

    const data = [
      body.id,
      body.email,
      body.first_name,
      body.last_name,
      hash,
    ];

    return pool.query(sql, [
      body.id,
      body.email,
      body.first_name,
      body.last_name,
    ].concat(body.password ? [hash] : []))
  }

  add_category(categoryId, userId) {
    return new Promise(
      function(resolve, reject) {
        pool.query("INSERT INTO user_category (user_id, category_id) VALUES ($1, $2) RETURNING *", [userId, categoryId])
          .then(function(result) {
            result = result.rows[0];
            result["success"] = true;
            resolve(result)
          })
          .catch(function(err) {
            reject(err)
          })
      })
  }

  add_module(module, userId) {
    return new Promise(
      function(resolve, reject) {
        pool.query("INSERT INTO user_modules (user_id, module) VALUES ($1, $2) RETURNING *", [userId, module])
          .then(function(result) {
            result = result.rows[0];
            result["success"] = true;
            resolve(result)
          })
          .catch(function(err) {
            reject(err)
          })
      })
  }

  get_all() {
    const sql = `SELECT * FROM users WHERE admin = false ORDER BY id`;
    return pool.query(sql).then(result => result.rows.map(row => omit(row, 'password')));
  }

  get_all_categories() {
    return pool.query(`SELECT * FROM user_category`).then(result => result.rows);
  }

  get_all_modules() {
    return pool.query(`SELECT * FROM user_modules`).then(result => result.rows);
  }

  async save_modules(userId, newModules) {
    const modules = await this.get_modules(userId);
    const modulesIds = modules.map(m => m.module);
    const toRemove = difference(modulesIds, newModules);
    const toCreate = difference(newModules, modulesIds);

    await Promise.all(toRemove.map(module => this.delete_module(module, userId)));
    await Promise.all(toCreate.map(module => this.add_module(module, userId)));

    return query(`SELECT * FROM user_modules WHERE user_id = $1`, [userId]);
  }

  async save_categories(userId, newCategories) {
    const categories = await this.get_categories(userId);
    const categoriesIds = categories.map(m => m.id);
    const toRemove = difference(categoriesIds, newCategories);
    const toCreate = difference(newCategories, categoriesIds);

    await Promise.all(toRemove.map(category => this.delete_category(category, userId)));
    await Promise.all(toCreate.map(category => this.add_category(category, userId)));

    return query(`SELECT * FROM user_category WHERE user_id = $1`, [userId]);
  }

  get_categories(userId) {
    const sql = `
      SELECT category.* FROM user_category
      LEFT JOIN category ON category.id = user_category.category_id
      WHERE user_category.user_id = $1`;

    return pool.query(sql, [userId])
      .then(result => result.rows.map(r => Object.assign({}, r, {
        pictureUrl: 'https://picsum.photos/500/700/?random'
      })));
  }

  get_modules(userId) {
    const sql = `
      SELECT modules.* FROM user_modules 
      LEFT JOIN modules ON modules.module = user_modules.module
      WHERE user_modules.user_id = $1
    `;

    return pool.query(sql, [userId])
      .then(result => result.rows);
  }

  delete_category(categoryId, userId) {
    return pool.query("DELETE FROM user_category WHERE category_id = $1 AND user_id = $2 RETURNING *", [categoryId, userId])
  }

  delete_module(module, userId) {
    return pool.query("DELETE FROM user_modules WHERE module LIKE $1 AND user_id = $2 RETURNING *", [module, userId])
  }


}


module.exports = UserService;