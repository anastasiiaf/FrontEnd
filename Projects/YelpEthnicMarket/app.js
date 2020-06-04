var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var market = [
  {
    name: 'Grønland Torg',
    image: 'https://pbs.twimg.com/media/A8YxpuiCAAACxgY.jpg',
  },

  {
    name: 'Brugata Torg',
    image: 'https://mappno.com/yer/gr-nlandtorg-frukt-gr-nt-3225.jpg',
  },
  {
    name: 'Lambertseter Torg',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/LpU0vCDv6fqLSNRF45d64Q/300s.jpg',
  },
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('landing');
});

app.get('/market', function (req, res) {
  res.render('market', { market: market });
});

app.post('/market', function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newShop = { name: name, image: image };
  market.push(newShop);
  res.redirect('/market'); // default is to redirect as get route
});

app.get('/market/new', function (req, res) {
  res.render('new');
});

app.listen(3000, process.env.IP, function () {
  console.log('YelpEthnicMarket server has started!');
});
