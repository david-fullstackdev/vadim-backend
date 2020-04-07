const { env } = require('../config');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[env]);

module.exports = knex;
