

const pool = require('../../database/database').pool;
const csv = require('csvtojson');
const fs = require('fs');


class FactService {

  constructor() {

  }

  post() {

  }

  get() {

  }

  delete() {

  }

  load_data(category) {

    let errors = 0;
    let n = 0;
    const col_fixed_names = ['category', 'week', 'units', 'value', 'store', 'outlet', 'postalcode', 'brand', 'item']
    var InsertArray = [];
    var columnNames = [];

    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream("C:\\Users\\User\\Desktop\\categories\\" + category + "\\" + category + "_fact.csv")
    });

    lineReader.on('line', function (line) {
      n++;
      if(n === 1) {
        columnNames = line.split(',').map((x)=>{return x.replace(/['"]+/g, '')})
      }
      else {
        const row = {'attributes':{}};
        const sep_list = line.split(',');
        for(var i in columnNames) {
          if(col_fixed_names.includes(columnNames[i])) {
            row[columnNames[i]] = sep_list[i].replace(/['"]+/g, '')
          }
          else {
            row['attributes'][columnNames[i]] = sep_list[i].replace(/['"]+/g, '')
          }
        }
        InsertArray.push(
          pool.query("INSERT INTO fact (category, week, units, value, store, outlet, postalcode, brand, item, attributes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)",
            [category, row.week, row.units, row.value, row.store, row.outlet, row.postalcode, row.brand, row.item, row.attributes])
            .catch(function(err){
              errors += 1;
              console.log(err)
            })
        );
      }
      if(n===10000) {
        lineReader.pause();
        Promise.all(InsertArray)
          .then(function(){
            n=1;
            InsertArray = [];
            lineReader.resume();
          })
          .catch(function(err) {
            console.log(err)
          })
      }
    });

    lineReader.on('close',function() {
      console.log("number of errors: ", errors);
      if (n > 1) {
        Promise.all(InsertArray)
          .then(function(){

          })
          .catch(function(err){
            console.log(err)
          })
      }
    });

    return "Fact Load for " + category + " Started"

  }


}

module.exports = FactService;

