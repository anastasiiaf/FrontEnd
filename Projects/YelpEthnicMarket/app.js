// declaration of several variables in line
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  ethnicMarket = require('./models/market'),
  Comment = require('./models/comment'),
  seedDB = require('./seeds');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/YelpEthnicMarket?retryWrites=true&w=majority',
); // check how to encode password!!!

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// seed: empties db and seeds with some data - easier to check if next models (comments) work
seedDB();

//
app.get('/', function (req, res) {
  res.render('landing');
});

// INDEX - show all shops in the market
app.get('/market', function (req, res) {
  ethnicMarket.find({}, function (err, shops) {
    if (err) {
      console.log(err);
    } else {
      res.render('market/index', { market: shops });
    }
  });
});

// CREATE - add new shop to the market
app.post('/market', function (req, res) {
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
app.get('/market/new', function (req, res) {
  res.render('market/new');
});

// SHOW - shows more info about shop
// '/market/:id' - this rout should be after '/market/new' GET rout
// otherwise, it will be overwritten
app.get('/market/:id', function (req, res) {
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

// NEW Comment route
app.get('/market/:id/comments/new', function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, shop) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { market: shop });
    }
  });
});

// CREATE Comment route
app.post('/market/:id/comments', function (req, res) {
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

app.listen(3000, process.env.IP, function () {
  console.log('YelpEthnicMarket server has started!');
});
