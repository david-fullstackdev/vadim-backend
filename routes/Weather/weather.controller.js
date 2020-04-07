
const WeatherService = require('./weather.service');
const weatherService = new WeatherService();


class WeatherController {

  get_station(req, res) {
    weatherService.get_station(req.query.station)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }


  get_stations(req, res) {
    weatherService.get_stations()
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        res.send(err)
      })
  }


}

module.exports = WeatherController;