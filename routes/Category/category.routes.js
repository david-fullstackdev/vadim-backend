
const express = require('express');
const CategoryController = require('./category.controller');
const routes = express.Router();

const categoryController = new CategoryController();

// CRUD Operations
routes.post('/category', categoryController.post);
routes.get('/category', categoryController.get);
routes.delete('/category', categoryController.del);
routes.put('/category', categoryController.put);


// Retrieve entire table
routes.get('/categories', categoryController.get_all);

//Start Data Extract Job
routes.post('/category/extract', categoryController.extract_category);


// routes for retrieving category sales
routes.get('/category/sales/:category', categoryController.get_sales);

module.exports = routes;