const moment = require('moment');
const assign = require('lodash/assign');
const casual = require('casual');
const map = require('lodash/map');
const knex = require('../index');
const times = require('lodash/times');

// Un-comment this code to enable Knex query error logging
// knex.on('query-error', (error, details) => {
//   console.error('Knex Query Error');
//   console.error(error, details);
// });

const mapIds = (collection = []) =>
  map(collection, (item, id) => assign({}, item, { id: id + 1 }));

const resetSequence = (tableName, initial) =>
  knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH ${initial}`);

const resetTableWithoutId = (tableName, seed) =>
  knex(tableName).insert(seed);

const resetTableWithId = (tableName, seed) =>
  resetSequence(tableName, 1)
    .then(() => knex(tableName).insert(seed))
    .then(() => knex(tableName).max('id'))
    .then(([{ max }]) => resetSequence(tableName, max + 1));

/**
 * Resets a provided table with the provided seed data
 */
const resetTable = (tableName, seed) =>
  knex(tableName)
    .delete()
    .then(() => knex.schema.hasColumn(tableName, 'id'))
    .then((hasId) => hasId
      ? resetTableWithId(tableName, seed)
      : resetTableWithoutId(tableName, seed)
    );

const sample = collection =>
  collection[casual.integer(0, collection.length - 1)];

const shuffle = collection => {
  const result = collection.slice();
  for (let i = result.length; i; i--) {
    let j = casual.integer(0, i);
    [result[i - 1], result[j]] = [result[j], result[i - 1]];
  }
  return result;
};

const sampleSize = (collection, size) => {
  const shuffledIndexes = shuffle(times(collection.length, ix => ix));
  return times(size, ix => collection[shuffledIndexes[ix]]);
};

const dateAfterDate = (
  startDate,
  number = casual.integer(1, 15),
  timeframe = 'months'
) => moment(startDate).add(number, timeframe).toISOString();

module.exports = {
  knex,
  mapIds,
  resetTable,
  shuffle,
  sample,
  sampleSize,
  dateAfterDate,
};
