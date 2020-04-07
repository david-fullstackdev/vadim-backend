
const express = require('express');
const FactController = require('./fact.controller');
const routes = express.Router();

const factController = new FactController();

routes.post('/fact', factController.post);
routes.get('/fact', factController.get);
routes.delete('/fact', factController.del);


module.exports = routes;
