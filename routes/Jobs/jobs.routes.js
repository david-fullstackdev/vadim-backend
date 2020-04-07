
const express = require('express');
const JobController = require('./jobs.controller');
const routes = express.Router();

const jobsController = new JobController();

routes.post('/jobs/:jobType', jobsController.run_job);


module.exports = routes;