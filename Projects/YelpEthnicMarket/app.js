var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/YelpEthnicMarket?retryWrites=true&w=majority',
);

// Schema setup

var shopSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

var ethnicMarket = mongoose.model('market', shopSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('landing');
});

// INDEX - show all shops in the market
app.get('/market', function (req, res) {
  ethnicMarket.find({}, function (err, shops) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { market: shops });
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
  res.render('new');
});

//SHOW - shows more info about shop
// '/market/:id' - this rout should be after '/market/new' GET rout
// otherwise, it will be overwritten
app.get('/market/:id', function (req, res) {
  ethnicMarket.findById(req.params.id, function (err, foundShop) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { market: foundShop });
    }
  });
});

app.listen(3000, process.env.IP, function () {
  console.log('YelpEthnicMarket server has started!');
});
