var ordbok = require('ordbok'),
  express = require('express'),
  request = require('request');
var app = express();
app.set('view engine', 'ejs');
var options = { word: 'lese' };

//var striptags = require('striptags');
const stripHtml = require('string-strip-html');
const { extract } = require('article-parser');

//const url = 'https://www.klartale.no/norge/mener-folk-betaler-for-mye-for-mat-1.1733276';

/* extract(url)
  .then((article) => {
    console.log(stripHtml(article.content));
  })
  .catch((err) => {
    console.log(err);
  });
 */

ordbok(options, function (error, data) {
  //console.log(data);
  //console.log(data['bokmal'][0]['paradigm']);
  //console.log(data['bokmal'][0]['interpretation']);
  //console.log(data['bokmal'][0]['interpretation'][0]['definition']);
});
