

const pool = require('../../database/database').pool;
const csv = require('csvtojson');
const fs = require('fs');
const zlib = require('zlib');
const d3 = require('d3');


class WeatherService {

  constructor() {

  }

  get_stations() {
    return pool.query("SELECT * FROM weather_stations")
  }

  get_station(station) {
    pool.query("SELECT * FROM weather_stations WHERE station LIKE $1", [station])
      .then(function(station_data) {
        station_data = station_data.rows[0];
        pool.query("SELECT * FROM weather_data WHERE station LIKE $1", [station])
          .then(function(weather_data) {
            station_data['data'] = weather_data.rows;
          })
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  load_year(year) {
    let lineReader = require('readline').createInterface({
      input: fs.createReadStream('../../data/weather/ftp.ncdc.noaa.gov/pub/data/ghcn/daily/by_year/'+year.toString()+'.csv.gz').pipe(zlib.createGunzip())
    });
    let queryArray = [];
    let n = 0;
    lineReader.on('line', (line) => {
      n += 1;
      const split_line = line.split(',');
      const row_query = pool.query("INSERT INTO weather_data (station, date, type, value) VALUES ($1,$2,$3,$4)",
        [split_line[0], split_line[1], split_line[2], split_line[3]]);
      queryArray.push(row_query);
      if(n===1000) {
        lineReader.pause();
        Promise.all(queryArray)
          .then(function(){
            n=0;
            queryArray = [];
            lineReader.resume();
          })
          .catch(function(err) {
            console.log(err)
          })
      }
    });
    lineReader.on('close',function() {
      if (n > 0) {
        Promise.all(queryArray)
          .then(function(){

          })
          .catch(function(err){
            console.log(err)
          })
      }
    });
  }

  load_stations() {
    let n = 0;
    let queryArray = [];
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream("../../data/weather/ghcnd-stations.txt")
    });
    lineReader.on('line', function (line) {
      const id = line.substring(0,11).trim();
      const latitude = line.substring(12, 19).trim();
      const longitude = line.substring(20,29).trim();
      const elevation = line.substring(30, 36).trim();
      const state = line.substring(37,39).trim();
      const name  = line.substring(40,70).trim();
      const row_data = {
        id: id,
        latitude: latitude,
        longitude: longitude,
        elevation: elevation,
        state: state,
        name: name
      };
      const row_query = pool.query("INSERT INTO weather_stations " +
        "(station, latitude, longitude, elevation, state, name) " +
        "VALUES ($1,$2,$3,$4,$5,$6)",
        [row_data.id, row_data.latitude, row_data.longitude,
          row_data.elevation,
          row_data.state, row_data.name]);
      queryArray.push(row_query);
      if(n===1000) {
        lineReader.pause();
        Promise.all(queryArray)
          .then(function(){
            n=0;
            queryArray = [];
            lineReader.resume();
          })
          .catch(function(err) {
            console.log(err)
          })
      }
    });
    lineReader.on('close',function() {
      if (n > 0) {
        Promise.all(queryArray)
          .then(function(){
          })
          .catch(function(err){
            console.log(err)
          })
      }
    });
  }
}

 module.exports = WeatherService;
