
const express = require('express');
const PromotionController = require('./promotion.controller');
const routes = express.Router();

const promotionController = new PromotionController();

routes.get('/promotion/own/:category', promotionController.get_own);
routes.get('/promotion/cross/:category', promotionController.get_cross);
routes.get('/promotion/dt/:category', promotionController.get_dt);

module.exports = routes;
