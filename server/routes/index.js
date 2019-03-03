var express = require('express');
var router = express.Router();
var userSchemas = require('../schema/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("WELCOME")
});

//ADD PRODUCT
router.get('/addstud', function (req, res, next) {
  console.log(req.body)
      var Student = new userSchemas.Student({
        name: req.body.name,
        price: req.body.price,
      })
      var errors = Student.validateSync()
      if (errors != null) {
        if (errors.errors["name"]) {
          res.send({
            error: true,
            message: errors.errors["name"].message
          })
        } else if (errors.errors["section"]) {
          res.send({
            error: true,
            message: errors.errors["section"].message
          })
        } else if (errors.errors["uid"]) {
          res.send({
            error: true,
            message: errors.errors["uid"].message
          })
        } else {
          res.redirect("../404")
        }
      } else {
        Student.save(function (err, data) {
          if (err) {
            res.send({
              error: true,
              message: "Some error has occured. Code 1000"
            })
          } else {
            res.send({
              error: false,
              message: "Successfully added."
            })
          }
        })
      }
});
module.exports = router;