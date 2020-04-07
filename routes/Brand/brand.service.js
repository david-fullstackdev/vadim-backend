
const pool = require('../../database/database').pool;


class BrandService {

  constructor() {

  }


  get_sales(category) {
    console.log('brand service')
    return pool.query('SELECT * FROM brand_sales WHERE category=$1', [category])
  }

}

module.exports = BrandService;