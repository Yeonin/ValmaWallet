var express = require('express');
var router = express.Router();
var userSchemas = require('../schema/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("WELCOME")
});

//GET
router.get('/products', function (req, res, next) {
  userSchemas.Product.find({}, function (err, data) {
    if (err) {
      res.send({
        error: true,
        message: err
      })
    } else {
      res.send({
        error: false,
        message: data
      })
    }
  })
});
router.get('/students', function (req, res, next) {
  userSchemas.Student.find({}, function (err, data) {
    if (err) {
      res.send({
        error: true,
        message: err
      })
    } else {
      res.send({
        error: false,
        message: data
      })
    }
  })
});
router.get('/student/:id', function (req, res, next) {
  userSchemas.Student.find({
    uid: req.params.id
  }, function (err, data) {
    if (err) {
      res.send({
        error: true,
        message: err
      })
    } else {
      if(data.length < 1){
        res.send({
          error: true,
          message: "Card not found."
        })
      }else{
        res.send({
          error: false,
          message: data
        })
      }

    }
  })
});
router.get('/html', function (req, res, next) {
  res.send('<div aria-labelledby="swal2-title" aria-describedby="swal2-content" class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-modal="true" style="display: flex;"><div class="swal2-header"><ul class="swal2-progresssteps" style="display: none;"></ul><div class="swal2-icon swal2-error" style="display: none;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><div class="swal2-icon swal2-question" style="display: none;"><span class="swal2-icon-text">?</span></div><div class="swal2-icon swal2-warning" style="display: none;"><span class="swal2-icon-text">!</span></div><div class="swal2-icon swal2-info" style="display: none;"><span class="swal2-icon-text">i</span></div><div class="swal2-icon swal2-success" style="display: none;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><h2 class="swal2-title" id="swal2-title">CART</h2><button type="button" class="swal2-close" style="display: none;">×</button></div><div class="swal2-content"><div id="swal2-content" style="display: block;"><table class="table table-striped"><tbody><tr> <td class="align-middle text-center"> <h1 class="rm-text"> Chicken /w rice </h1> </td><td class="align-middle text-center"><h1 class="rm-text"> 47 PHP</h1></td><td class="align-middle text-center"><button id="tester" class="btn btn-danger btn-block btn-outline" onclick="alert(`test`)">TEST</button></td></tr></tbody></table></div><input class="swal2-input" style="display: none;"><input type="file" class="swal2-file" style="display: none;"><div class="swal2-range" style="display: none;"><input type="range"><output></output></div><select class="swal2-select" style="display: none;"></select><div class="swal2-radio" style="display: none;"></div><label for="swal2-checkbox" class="swal2-checkbox" style="display: none;"><input type="checkbox"></label><textarea class="swal2-textarea" style="display: none;"></textarea><div class="swal2-validationerror" id="swal2-validationerror" style="display: none;"></div></div><div class="swal2-actions" style="display: flex;"><button type="button" class="swal2-confirm swal2-styled" aria-label="" style="border-left-color: rgb(115, 108, 199); border-right-color: rgb(115, 108, 199);">Confirm</button><button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block;">Cancel</button></div><div class="swal2-footer" style="display: none;"></div></div>')
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
          message: "NFC card already used."
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

//REMOVE STUDENT
router.post('/remstud', function (req, res, next) {
  userSchemas.Student.findByIdAndDelete(req.body.id, function (err, data) {
    if (err) {
      res.send({
        error: true,
        message: err
      })
    } else {
      res.send({
        error: false,
        message: "Successfully removed."
      })
    }
  })
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
//REMOVE PRODUCT
router.post('/remprod', function (req, res, next) {
  userSchemas.Product.findByIdAndDelete(req.body.id, function (err, data) {
    if (err) {
      res.send({
        error: true,
        message: err
      })
    } else {
      res.send({
        error: false,
        message: "Successfully removed."
      })
    }
  })
});

//SELL
router.post('/sell', function (req, res, next) {
  userSchemas.Student.findOne({
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
  userSchemas.Student.findOne({
    uid: req.body.uid,
  }, function (err, data) {
    if (data == null) {
      res.send({
        error: true,
        message: "UID not found. Please retry."
      })
    } else {
      console.log(req.body)
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