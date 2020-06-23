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

// wiki api
const fetch = require('node-fetch');
var url = 'https://en.wikiquote.org/w/api.php';

var params = {
  action: 'query',
  titles: 'Family Guy/Season 2',
  prop: 'extracts',
  //explaintext: true,
  format: 'json',
};

url = url + '?origin=*';
Object.keys(params).forEach(function (key) {
  url += '&' + key + '=' + params[key];
});

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    var pages = response.query.pages;

    Object.keys(pages).forEach(function (page) {
      console.log(stripHtml(pages[page].extract, { ignoreTags: ['dl'] }));
    });

    /* if (response.query.search[0].title === 'Family Guy/Season 1') {
      console.log("Your search page 'Family Guy/Season 1' exists on English Wikipedia");
    } */
  })
  .catch(function (error) {
    console.log(error);
  });
