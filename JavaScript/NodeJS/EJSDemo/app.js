var express = require('express');
var app = express();

app.get('/', function (req, res) {
  //res.send('<h1>Welcome to the home page!</h1>');
  // embeded javascript
  res.render('home.ejs');
});

app.get('/fallinlovewith/:thing', function (req, res) {
  var thing = req.params.thing;
  res.render('love.ejs', { thingVar: thing });
});

app.get('/', function (req, res) {
  //res.send('<h1>Welcome to the home page!</h1>');
  // embeded javascript
  res.render('home.ejs');
});

app.listen(3000, process.env.IP, function () {
  console.log('Server is running!');
});
