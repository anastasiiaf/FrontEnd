var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', function (req, res) {
  var animals = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof',
    cat: 'Meow',
    bird: 'Tweet',
  };
  var sound = req.params.animal.toLowerCase();
  res.send('The ' + sound + ' says ' + animals[sound]);
});

app.get('/repeat/:greeting/:index', function (req, res) {
  var index = Number(req.params.index);
  var result = '';
  for (var i = 0; i < index; i++) {
    result += req.params.greeting + ' ';
  }
  res.send(result);
});

app.get('*', function (req, res) {
  res.send('Sorry, page not found...');
});

app.listen(3000, process.env.IP, function () {
  console.log('Server has started!');
});
