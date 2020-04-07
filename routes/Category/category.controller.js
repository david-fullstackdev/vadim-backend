
const CategoryService = require('./category.service');
const categoryService = new CategoryService();

class CategoryController {

  get(req, res) {
    categoryService.get(req.query.category)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  post(req, res) {
    categoryService.post(req.body)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  del(req, res) {
    categoryService.del(req.body.id)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  put(req, res) {
    categoryService.put(req.body)
      .then(function(results) {
        res.send(results.rows[0]);
      })
      .catch(function(err) {
        res.send(err);
        console.log(err)
      })
  }

  get_all(req, res) {
    categoryService.get_all()
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  extract_category(req, res) {
    categoryService.extract_category()
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  get_sales(req, res) {
    categoryService.get_sales(req.params.category)
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        console.log(err)
        res.send(err)
      })
  }

}


module.exports = CategoryController;