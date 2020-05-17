//https://www.developintelligence.com/blog/2017/02/rgb-to-hex-understanding-the-major-web-color-codes/
function hex2rgb(hex) {
  var str = hex.split('');
  var result = 'rgb( ';

  for (var i = 1; i < str.length; i += 2) {
    var firstDigit = Math.floor(hexList.indexOf(str[i]) * hexList.length);
    var secondDigit = Number(hexList.indexOf(str[i + 1]));
    if (i + 1 === str.length - 1) {
      result += firstDigit + secondDigit + ')';
    } else {
      result += firstDigit + secondDigit + ', ';
    }
  }
  return result;
}

var hexList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
var hex = '#fb0e9d';

rgb = hex2rgb(hex);
console.log(rgb);

/* https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 function hex2rgb(hex) {
  return (
    'rgb(' +
    (hex = hex.replace('#', ''))
      .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
      .map(function (l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .join(', ') +
    ')'
  );
} */
