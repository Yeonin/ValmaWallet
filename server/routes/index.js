var express = require('express');
var router = express.Router();
var userSchemas = require('../schema/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("WELCOME")
});

//ADD STUDENT
router.post('/addstud', function (req, res, next) {
  var Student = new userSchemas.Student({
    name: req.body.studname,
    section: req.body.studsection,
    uid: req.body.studid
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
//ADD PRODUCT
router.post('/addprod', function (req, res, next) {
  var Product = new userSchemas.Product({
    name: req.body.prodname,
    price: req.body.price,
  })
  var errors = Product.validateSync()
  if (errors != null) {
    if (errors.errors["name"]) {
      res.send({
        error: true,
        message: errors.errors["name"].message
      })
    } else if (errors.errors["price"]) {
      res.send({
        error: true,
        message: errors.errors["price"].message
      })
    } else {
      res.redirect("../404")
    }
  } else {
    Product.save(function (err, data) {
      if (err) {
        res.send({
          error: true,
          message: "Some error has occured. Code 1001"
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