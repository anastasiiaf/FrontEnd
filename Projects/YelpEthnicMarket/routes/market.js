var express = require('express');
var router = express.Router();
var ethnicMarket = require('../models/market');

// INDEX - show all shops in the market
router.get('/market', function (req, res) {
  ethnicMarket.find({}, function (err, shops) {
    if (err) {
      console.log(err);
    } else {
      res.render('market/index', { market: shops });
    }
  });
});

// CREATE - add new shop to the market
router.post('/market', function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newShop = { name: name, image: image, description: description };
  ethnicMarket.create(newShop, function (err, shop) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/market'); // default is to redirect as GET route
    }
  });
});

// NEW - show form to create a new shop
router.get('/market/new', function (req, res) {
  res.render('market/new');
});

// SHOW - shows more info about shop
// '/market/:id' - this rout should be after '/market/new' GET rout
// otherwise, it will be overwritten
router.get('/market/:id', function (req, res) {
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

module.exports = router;
