
const PromotionService = require('./promotion.service');
const promotionService = new PromotionService();


class UserController {

  get_own(req, res) {
    promotionService.get_own()
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  get_cross(req, res) {
    promotionService.get_cross()
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  get_dt(req, res) {
    console.log(req.params);
    promotionService.get_dt(req.params.category)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        console.log(err);
        res.send(err)
      })
  }

}




module.exports = UserController;