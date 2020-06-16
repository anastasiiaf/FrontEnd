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
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          shop.comments.push(comment);
          shop.save();
          res.redirect('/market/' + shop._id);
        }
      });
    }
  });
});

// EDIT ROUTE
router.get('/:comment_id/edit', function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        market_id: req.params.id,

        comment: foundComment,
      });
    }
  });
});

// UPDATE ROUTE
router.put('/:comment_id', function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    updatedComment,
  ) {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/market/' + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete('/:comment_id', function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect('back');
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
