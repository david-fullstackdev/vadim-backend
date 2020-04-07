
const express = require('express');
const UserController = require('./user.controller');
const routes = express.Router();

const userController = new UserController();

routes.post('/user/login', userController.login); // login user
routes.post('/user/signup', userController.signup); // signup new user

// TODO make routes below available for admin only
routes.get('/users', userController.get_all);
routes.put('/user', userController.put);
routes.delete('/user', userController.del);

routes.get('/user/category', userController.get_category); // get user categories
routes.post('/user/category', userController.add_category); // add category permission to a user
routes.delete('/user/category', userController.delete_category); //remove category from a user
routes.get('/users/categories', userController.get_all_categories);
routes.post('/users/categories', userController.save_categories);

routes.get('/user/module', userController.get_modules); // get user modules
routes.post('/user/module', userController.add_module); // add module permission to a user
routes.delete('/user/module', userController.delete_module); // remove module permission to a user
routes.get('/users/modules', userController.get_all_modules);
routes.post('/users/modules', userController.save_modules);

module.exports = routes;
