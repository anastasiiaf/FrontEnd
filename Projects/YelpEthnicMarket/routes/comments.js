var express = require('express');
var router = express.Router({ mergeParams: true }); // merge params from market and comments to access /market/:id/comments
var ethnicMarket = require('../models/market');
var Comment = require('../models/comment');

// NEW Comment route
router.get('/new', isLoggedIn, function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, shop) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { market: shop });
    }
  });
});

// CREATE Comment route
router.post('/', isLoggedIn, function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, shop) {
    if (err) {
      console.log(err);
      res.redirect('/market');
    } else {
      // req.body.comment contains text and author of comment
      // in new.ejs text and author are grouped: comment[text] and comment[author]
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          shop.comments.push(comment);
          shop.save();
          res.redirect('/market/' + shop._id);
        }
      });
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
