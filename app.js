

class App {

  constructor() {

    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const jwt = require('express-jwt');
    const morgan  = require('morgan');
    const path = require('path');
    const fileUpload = require('express-fileupload');

    this.app = express();
    const expressWs = require('express-ws')(this.app);
    this.app.use(fileUpload());
    this.app.use('/data', express.static('data'));
    this.app.use(cors());
    this.app.use(jwt({ secret: process.env.APP_SECRET }).unless({path: [
      '/user/login',
      '/user/signup'
    ]}));

    this.app.use(bodyParser.json({limit: '50mb'}));
    this.app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
    this.app.use(morgan('combined'));

    this.app.use(express.static(path.join(__dirname, './public')));

    this.app.set('views', path.join(__dirname, './views'));
    this.app.set('view engine', 'pug');

    if (process.env.NODE_ENV !== 'production') {
      this.app.use((req, res, next) => setTimeout(next, 200));
    }

    const categoryRoutes = require('./routes/Category/category.routes.js');
    const moduleRoutes = require('./routes/Module/module.routes.js');
    const userRoutes = require('./routes/User/user.routes.js');
    const weatherRoutes = require('./routes/Weather/weather.routes.js');
    const brandRoutes = require('./routes/Brand/brand.routes.js');
    const wdcRoutes = require('./routes/WDC/wdc.routes.js');
    const promotionRoutes = require('./routes/Promotion/promotion.routes.js');
    const jobRoutes = require('./routes/Jobs/jobs.routes.js');

    this.app.use('/', categoryRoutes);
    this.app.use('/', userRoutes);
    this.app.use('/', moduleRoutes);
    this.app.use('/', weatherRoutes);
    this.app.use('/', brandRoutes);
    this.app.use('/', wdcRoutes);
    this.app.use('/', promotionRoutes);
    this.app.use('/', jobRoutes);

    this.app.ws('/echo', function(ws, req) {
      ws.on('message', function(msg) {
        ws.send(msg);
      });
    });


  }

}

module.exports = App;