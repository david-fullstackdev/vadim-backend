const path = require('path');
const fs = require('fs');
const cwd = process.cwd();
const args = process.argv.slice(2);
const knex = require('./index');
const dataFolder = path.resolve(cwd, args[0]);

(async function main () {
  const subFolders = fs.readdirSync(dataFolder);

  await Promise.all(subFolders.map(processFolder));
  process.exit();
})();

async function processFolder(folderName) {
  const folderPath = path.resolve(dataFolder, folderName);

  console.log(`\nTable: ${folderName}`);
  await Promise.all(fs.readdirSync(folderPath)
    .map(name => processFile(name, folderName))
  ).catch(function(err){console.log(err)});
  console.log(`Table ${folderName} is imported`);
}

async function processFile(fileName, tableName) {
  const filePath = path.resolve(dataFolder, tableName, fileName);
  const csv = fs.readFileSync(filePath, 'utf-8');
  const data = csvToArrayOfObjects(csv);
  await knex.batchInsert(tableName, data, 5000);
  console.log(` - ${fileName}`);
}

function csvToArrayOfObjects(csvString) {
  const lines = csvString.split("\n").map(r => r.trim()).filter(r => !!r);
  const columns = lines[0].split(',');
  const rows = lines.slice(1);

  return rows.map(rowString => {
    const data = rowString.split(',');
    const row = {};

    data.forEach((cell, index) => {
      const column = columns[index];
      row[column] = cell;
    });

    return row;
  });
}

