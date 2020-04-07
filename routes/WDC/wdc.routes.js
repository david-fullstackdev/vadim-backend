
const express = require('express');
const routes = express.Router();
const fs = require('fs-extra')
const csv=require('csvtojson')


routes.get('/wdc/:product/:version/:category', function(req,res) {
  res.render("wdc_promo", {category: req.params.category, version: req.params.version, product: req.params.product})
});



routes.post('/wdc/file/upload/:product/:version/:category', function(req, res) {

  const dir = "data/" + req.params.product + "/" + req.params.version + "/" + req.params.category;


  fs.ensureDir(dir)
    .then(() => {
      let myFile = req.files['file'];
      var ret = []
      myFile.mv(dir + "/data.csv", function (err) {
        csv()
          .fromFile(dir + "/data.csv")
          .on('json',(jsonObj)=>{
            ret.push(jsonObj)
          })
          .on('done',(error)=>{
            fs.writeFile(dir + "/data.json", JSON.stringify(ret), "utf8", function() {
              res.send({"message": "Success!"})
            });
          })
      })
    })
    .catch(err => {
      res.status("404").send({"message": "Error!"})
    })


});

module.exports = routes;