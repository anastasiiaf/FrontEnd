var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pets = ['Raksy', 'Jack', 'Fima'];

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('home');
});

app.post('/addpet', function (req, res) {
  var newPet = req.body.newPet;
  pets.push(newPet);
  res.redirect('/pets');
});

app.get('/pets', function (req, res) {
  res.render('pets', { pets: pets });
});

app.listen(3000, process.env.IP, function () {
  console.log('Server started!');
});
