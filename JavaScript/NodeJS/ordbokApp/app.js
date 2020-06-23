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
      var content = stripHtml(pages[page].extract, { ignoreTags: ['dl', 'h3'] });
      //console.log(content);
      var episodesRanges = stripHtml(content, { ignoreTags: ['dl'], returnRangesOnly: true });
      //console.log(JSON.stringify(ranges, null, 4));
      //console.log(episodesRanges);
      var quotes = [];
      var episode = {
        title: String,
        episodeQuotes: [],
        episodeRange: [],
      };

      for (var i = 0; i < episodesRanges.length; i += 2) {
        //console.log(ranges[0][0]);
        var q = content.slice(episodesRanges[i][0], episodesRanges[i + 1][1]);
        episode.title = stripHtml(q);
        var qr = [];
        if (i + 2 < episodesRanges.length) {
          qr = [episodesRanges[i + 1][1], episodesRanges[i + 2][0]];
        } else {
          qr = [episodesRanges[i + 1][1], content.length];
        }
        //console.log('Episode range');
        //console.log(qr);
        episode.episodeRange.push(qr);
        quotes.push(episode);
        episode = {
          title: String,
          episodeQuotes: [],
          episodeRange: [],
        };
      }
      //console.log(quotes);

      quotes.forEach(function (item) {
        var quotesInEpisode = [];
        var episode = content.slice(item.episodeRange[0][0], item.episodeRange[0][1]);

        /*   console.log('=======================================');
        console.log(episode);
        console.log(item.episodeRange); */
        var quoteRange = stripHtml(episode, { returnRangesOnly: true });
        //console.log(quoteRange, quoteRange.length);

        var j = 0;
        for (var i = 0; i < quoteRange.length - 1; i++) {
          //console.log(quoteRange[i][0], quoteRange[i + 1][1]);
          var quote = episode.slice(quoteRange[i][0], quoteRange[i + 1][1]);
          quotesInEpisode.push(stripHtml(quote));
        }

        item.episodeQuotes.push(quotesInEpisode);

        //console.log(quotesInEpisode);
      });

      //console.log(quotes[0].episodeQuotes[0]);

      var randomSeed = Math.random();
      var x = Math.floor(randomSeed * quotes.length);
      var randomEpisode = quotes[x];
      var y = Math.floor(randomSeed * randomEpisode.episodeQuotes.length);
      var randomQuote = randomEpisode.episodeQuotes[0];
      console.log(x, randomEpisode);
      console.log(randomEpisode.title);
      console.log(y, randomQuote[y]);
    });

    /*   if (response.query.search[0].title === 'Family Guy/Season 1') {
      console.log("Your search page 'Family Guy/Season 1' exists on English Wikipedia");
    } */
  })
  .catch(function (error) {
    console.log(error);
  });
