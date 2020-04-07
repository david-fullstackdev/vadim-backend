
const ModuleService = require('./module.service');
const moduleService = new ModuleService();

class ModuleController {

  post(req, res) {
    moduleService.post(req.body.module)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  get(req, res) {
    moduleService.get(req.query.module)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  get_all(req, res) {
    moduleService.get_all()
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  del(req, res) {
    moduleService.del(req.body.module)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }


}




module.exports = ModuleController;