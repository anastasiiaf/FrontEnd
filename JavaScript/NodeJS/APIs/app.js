var request = require('request');
request('https://www.google.com', function (error, response, body) {
  if (error && response.statusCode == 200) {
    console.log('Something went wrong!!!');
    console.log(error);
  } else {
    console.log(body);
  }
});
