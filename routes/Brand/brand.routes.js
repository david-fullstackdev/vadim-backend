
const express = require('express');
const BrandController = require('./brand.controller');
const routes = express.Router();

const brandController = new BrandController();

// routes for retrieving category sales
routes.get('/brand/sales/:category', brandController.get_sales);

module.exports = routes;