var express = require('express');
var router = express.Router();
var userSchemas = require('../schema/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("WELCOME")
});

//GET
router.get('/products', function (req, res, next) {
  userSchemas.Product.find({},function(err,data){
    if(err){
      res.send({
        error: true,
        message: err
      })
    }else{
      res.send({
        error: false,
        message: data
      })
    }
  })
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

router.post('/sell', function (req, res, next) {
  userSchemas.Student.find({
    uid: req.body.uid
  }, function (err, data) {
    if (data == null) {
      res.send({
        error: true,
        message: "UID not found. Please retry."
      })
    } else {
      if (data.balance > req.body.amount) {
        data.balance -= parseInt(req.body.amount)
        data.save(function (err, data) {
          if (err) {
            res.send({
              error: true,
              message: err
            })
          } else {
            if (parseInt(req.body.amount) > 0) {
              var log = new userSchemas.selllog({
                uid: req.body.uid,
                products: req.body.products,
                total: req.body.amount
              })
              var errors = log.validateSync()
              if (errors != null) {
                if (errors.errors["uid"]) {
                  res.send({
                    error: true,
                    message: errors.errors["uid"].message
                  })
                } else if (errors.errors["total"]) {
                  res.send({
                    error: true,
                    message: errors.errors["total"].message
                  })
                } else {
                  res.redirect("../404")
                }
              } else {
                log.save(function (err, data) {
                  if (err) {
                    res.send({
                      error: true,
                      message: "Some error has occured. Code 1002"
                    })
                  } else {
                    res.send({
                      error: false,
                      message: "Successfully sold."
                    })
                  }
                })
              }
            } else {
              res.send({
                error: true,
                message: "No products added. Please put something on the cart."
              })
            }
          }
        })
      } else {
        res.send({
          error: true,
          message: "Insufficient balance. Please top up."
        })
      }
    }
  })
});
router.post('/topup', function (req, res, next) {
  userSchemas.Student.find({
    uid: req.body.uid
  }, function (err, data) {
    if (data == null) {
      res.send({
        error: true,
        message: "UID not found. Please retry."
      })
    } else {
        data.balance += parseInt(req.body.amount)
        data.save(function (err, data) {
          if (err) {
            res.send({
              error: true,
              message: err
            })
          } else {
            if (parseInt(req.body.amount) > 0) {
              var log = new userSchemas.addlog({
                uid: req.body.uid,
                amount: req.body.amount,
              })
              var errors = log.validateSync()
              if (errors != null) {
                if (errors.errors["uid"]) {
                  res.send({
                    error: true,
                    message: errors.errors["uid"].message
                  })
                } else if (errors.errors["amount"]) {
                  res.send({
                    error: true,
                    message: errors.errors["amount"].message
                  })
                } else {
                  res.redirect("../404")
                }
              } else {
                log.save(function (err, data) {
                  if (err) {
                    res.send({
                      error: true,
                      message: "Some error has occured. Code 1003"
                    })
                  } else {
                    res.send({
                      error: false,
                      message: "Successfully added."
                    })
                  }
                })
              }
            } else {
              res.send({
                error: true,
                message: "No products added. Please put something on the cart."
              })
            }
          }
        })
    
    }
  })
});

module.exports = router;