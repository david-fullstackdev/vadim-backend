
const UserService = require('./user.service');
const userService = new UserService();


class UserController {

  signup(req, res) {
    userService.signup(req.body.first_name, req.body.last_name, req.body.email, req.body.password)
      .then(function(results) {
        res.send(results.rows[0])
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  login(req, res) {
    userService.login(req.body.email, req.body.password)
      .then(results => res.send(results))
      .catch(err => {
        res.status(err.code || 500);
        res.send(err.message);
      })
  }

  put(req, res) {
    userService.put(req.body)
      .then(results => res.send(results.rows[0]))
      .catch(err => res.send(err))
  }

  del(req, res) {
    userService.del(req.body.id)
      .then(results => res.send(results.rows[0]))
      .catch(err => res.send(err))
  }

  get_category(req, res) {
    userService.get_categories(req.user.id)
      .then(categories => res.send(categories))
      .catch(err => res.send(err))
  }

  get_modules(req, res) {
    userService.get_modules(req.user.id)
      .then(modules => res.send(modules))
      .catch(err => res.send(err))
  }

  get_all(req, res) {
    userService.get_all()
      .then(users => res.send(users))
      .catch(err => res.send(err))
  }

  get_all_categories(req, res) {
    userService.get_all_categories()
      .then(usersCategories => res.send(usersCategories))
      .catch(err => res.send(err))
  }

  get_all_modules(req, res) {
    userService.get_all_modules()
      .then(usersModules => res.send(usersModules))
      .catch(err => res.send(err))
  }

  add_category(req, res) {
    userService.add_category(req.body.category, req.body.email)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  save_categories(req, res) {
    userService.save_categories(req.body.userId, req.body.categories)
      .then(categories => res.send(categories))
      .catch(err => res.send(err))
  }

  save_modules(req, res) {
    userService.save_modules(req.body.userId, req.body.modules)
      .then(modules => res.send(modules))
      .catch(err => res.send(err))
  }

  delete_category(req, res) {
    userService.delete_category(req.body.category, req.body.email)
      .then(function(results) {
        res.send(results)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  add_module(req, res) {
    userService.add_module(req.body.module, req.body.email)
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  delete_module(req, res) {
    userService.delete_module(req.body.module, req.body.email)
      .then(function(results) {
        res.send(results.rows)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

}




module.exports = UserController;