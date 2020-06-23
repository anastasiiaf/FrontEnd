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

const cb = ({ tag, deleteFrom, deleteTo, insert, rangesArr, proposedReturn }) => {
  rangesArr.push(deleteFrom, deleteTo, insert);
};

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
      var content = stripHtml(pages[page].extract, { ignoreTags: ['dl'] });
      //console.log(content);
      var rangesEpisode = stripHtml(content, { returnRangesOnly: true });
      //console.log(JSON.stringify(ranges, null, 4));

      for (var i = 0; i < rangesEpisode.length; i += 2) {
        //console.log(ranges[0][0]);
        var q = content.slice(rangesEpisode[i][0], rangesEpisode[i + 1][1]);
        quotes.episode = quotes.push(stripHtml(q));
      }
      /* console.log(quotes);
      console.log(ranges);
      console.log(content); */

      console.log(quotes[Math.floor(Math.random() * quotes.length)]);
    });

    /* if (response.query.search[0].title === 'Family Guy/Season 1') {
      console.log("Your search page 'Family Guy/Season 1' exists on English Wikipedia");
    } */
  })
  .catch(function (error) {
    console.log(error);
  });

/* var a =
  '<h3><span id="Peter.2C_Peter.2C_Caviar_Eater"></span><span id="Peter,_Peter,_Caviar_Eater"><i>Peter, Peter, Caviar Eater</i></span></h3><dl><dd><b>Peter</b>: Brian, teach me how to be a gentleman.</dd></dl>';
var r = stripHtml(a, { ignoreTags: ['dl', 'h3'] });
var rang = stripHtml(r, { ignoreTags: ['dl'], returnRangesOnly: true });
console.log(r);
console.log(rang); */
