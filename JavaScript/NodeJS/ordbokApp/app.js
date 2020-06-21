var ordbok = require('ordbok'),
  express = require('express'),
  request = require('request');
var app = express();
app.set('view engine', 'ejs');
var options = { word: 'lese' };

app.get('/results', function (req, res) {
  var query = req.query.search;
  var url = 'http://tekstlab.uio.no/ordforradet/nb';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      //res.send(data);
      res.render('results', { data: data });
    }
  });
});

app.listen(3000, process.env.IP, function () {
  console.log('Server has started!');
});

ordbok(options, function (error, data) {
  console.log(data);
  //console.log(data['bokmal'][0]['paradigm']);
  console.log(data['bokmal'][0]['interpretation']);
  //console.log(data['bokmal'][0]['interpretation'][0]['definition']);
});
