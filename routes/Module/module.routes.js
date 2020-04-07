
const express = require('express');
const ModuleController = require('./module.controller');
const routes = express.Router();

const moduleController = new ModuleController();

routes.get('/modules', moduleController.get_all);
routes.post('/module', moduleController.post);
routes.get('/module', moduleController.get);
routes.delete('/module', moduleController.del);

module.exports = routes;