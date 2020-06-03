var ordbok = require('ordbok');
var options = { word: 'lese' };

ordbok(options, function (error, data) {
  console.log(data);
  console.log(data['bokmal'][0]['paradigm']);
  console.log(data['bokmal'][0]['interpretation']);
  console.log(data['bokmal'][0]['interpretation'][0]['definition']);
});
