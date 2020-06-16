var express = require('express');
var router = express.Router();
var ethnicMarket = require('../models/market');

// INDEX - show all shops in the market
router.get('/', function (req, res) {
  ethnicMarket.find({}, function (err, shops) {
    if (err) {
      console.log(err);
    } else {
      res.render('market/index', { market: shops });
    }
  });
});

// CREATE - add new shop to the market
router.post('/', isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newShop = { name: name, image: image, description: description, author: author };
  ethnicMarket.create(newShop, function (err, shop) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/market'); // default is to redirect as GET route
    }
  });
});

// NEW - show form to create a new shop
router.get('/new', isLoggedIn, function (req, res) {
  res.render('market/new');
});

// SHOW - shows more info about shop
// '/market/:id' - this rout should be after '/market/new' GET rout
// otherwise, it will be overwritten
router.get('/:id', function (req, res) {
  ethnicMarket
    .findById(req.params.id)
    .populate('comments')
    .exec(function (err, foundShop) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundShop);
        res.render('market/show', { market: foundShop });
      }
    });
});

// EDIT ROUTE
router.get('/:id/edit', function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, foundShop) {
    if (err) {
      res.redirect('/market');
    } else {
      res.render('market/edit', { market: foundShop });
    }
  });
});

// UPDATE ROUTE
router.put('/:id', function (req, res) {
  ethnicMarket.findByIdAndUpdate(req.params.id, req.body.market, function (err, updatedShop) {
    if (err) {
      res.redirect('/market');
    } else {
      res.redirect('/market/' + req.params.id);
    }
  });
});

// middleware - checks if user is logged in;
// put in crate new comment route
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
