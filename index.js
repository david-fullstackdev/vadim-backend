
const config = require('dotenv').config();

const Server = require('./server');
const Cluster  = require('./cluster');
const App = require('./app');

const app = new App().app;
const server = new Server(app, 8080);
const cluster = new Cluster(server, 2);

cluster.start();
