
const FactService = require('./fact.service');
const factService = new FactService();

class ModuleController {

  post(req, res) {
    factService.post(req.body.module)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  get(req, res) {
    factService.get(req.query.module)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  del(req, res) {
    factService.del(req.body.module)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  load_data(req, res) {
    factService.load_data(req.body.category)
      .then(function (results) {
        res.send(results)
      })
      .catch(function(err){
        res.send(err)
      })
  }



}




module.exports = ModuleController;