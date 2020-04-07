
const BrandService = require('./brand.service');
const brandService = new BrandService();


class BrandController {

  get_sales(req, res) {
    brandService.get_sales(req.params.category)
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

}

module.exports = BrandController;