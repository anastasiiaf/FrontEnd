var express = require('express');
var app = express();

// "/" root path; req - object contains info about request,
// res - object contains info about response
app.get('/', function (req, res) {
  res.send('Hi there!');
});

// "/bye" Goodbye
app.get('/bye', function (req, res) {
  console.log('Someone made a request to /bye');
  res.send('Goodbye!');
});
// "/dog" Meow
app.get('/dog', function (req, res) {
  console.log('Someone made a request to /dog');
  res.send('Bark Woof!');
});

//introduce rout parameter to define pattern.
// ":" tells Express to not match character for character
app.get('/r/:subredditName', function (req, res) {
  res.send('Welcome to ' + req.params.subredditName + ' subreddit!');
});

app.get('/r/:subredditName/comments/:id/:title', function (req, res) {
  res.send('Welcome to the comments page!');
});

app.get('*', function (req, res) {
  res.send('You are a star!');
});

// Tell express to listen for requests (start server)
// localhost:3000, to restart server enter crtl+C
app.listen(3000, process.env.IP, function () {
  console.log('Server has started!');
});
