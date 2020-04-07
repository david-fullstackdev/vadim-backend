const knexCleaner = require('knex-cleaner');
const knex = require('../../index');
const { resetTable } = require('../utils');

const users = require('../objects/users')();
const modules = require('../objects/modules')();
const categories = require('../objects/categories')();
const userModules = require('../objects/user_modules')();
const userCategories = require('../objects/user_categories')();
const sasTemplates = require('../objects/sas_templates')();
const sasSchema = require('../objects/sas_schema')();


exports.seed = () =>
  knexCleaner
    .clean(knex, {
      ignoreTables: ['migrations', 'migrations_lock'],
    })
    .then(() => resetTable('users', users))
    .then(() => resetTable('modules', modules))
    .then(() => resetTable('category', categories))
    .then(() => resetTable('user_modules', userModules))
    .then(() => resetTable('user_category', userCategories))
    .then(() => resetTable('sas_templates', sasTemplates))
    .then(() => resetTable('sas_schema', sasSchema))
