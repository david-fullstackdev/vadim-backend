
const express = require('express');
const WeatherController = require('./weather.controller');
const routes = express.Router();

const weatherController = new WeatherController();

routes.get('/weather/stations', weatherController.get_stations);
routes.get('/weather/station', weatherController.get_station);

module.exports = routes;
