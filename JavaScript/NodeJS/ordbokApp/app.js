var ordbok = require('ordbok'),
  express = require('express');

var app = express();
app.set('view engine', 'ejs');
const fetch = require('node-fetch');
//var options = { word: 'lese' };
var options = { word: 'lesende' };

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
  //console.log(error);
  //console.log(data['bokmal'][0]['paradigm']);
  //console.log(data['bokmal'][0]['interpretation']);
  //console.log(data['bokmal'][0]['interpretation'][0]['definition']);
});

const request = require('request');
const uri = 'http://ordbok.uib.no/perl/ordbok.cgi';
const parser = require('parser');
let reqOpts = {
  begge: '+&ordbok=begge',
};

function OB(opts, callback) {
  if (!opts.word) {
    return callback(new Error('Missing required param: word'), null);
  }

  reqOpts.OPP = opts.word;

  request(uri, { qs: reqOpts }, function (error, response, body) {
    if (error) {
      return callback(error, null);
    }

    parser(body.toString(), function (err, data) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, data);
    });
  });
}

OB({ word: query }, function (err, data) {
  if (err) {
    throw err;
  }
  console.log(JSON.stringify(data));
});
