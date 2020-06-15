var express = require('express');
var router = express.Router();
var ethnicMarket = require('../models/market');
var Comment = require('../models/comment');

// CREATE Comment route
router.post('/market/:id/comments', isLoggedIn, function (req, res) {
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

// NEW Comment route
router.get('/market/:id/comments/new', isLoggedIn, function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, shop) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { market: shop });
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
