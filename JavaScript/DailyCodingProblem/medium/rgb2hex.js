//https://www.developintelligence.com/blog/2017/02/rgb-to-hex-understanding-the-major-web-color-codes/
function rgb2hex(rgb) {
  var str = rgb.match(/(\d+)/g);
  var result = '#';
  str.forEach(function (code) {
    var firstDigitIndex = Math.floor(code / hexList.length);
    var secondDigitIndex = Math.floor((code / hexList.length - firstDigitIndex) * hexList.length);
    result += hexList[firstDigitIndex] + hexList[secondDigitIndex];
  });
  return result;
}

var hexList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
var rgb = 'rgb(251, 14, 157)';

hex = rgb2hex(rgb);
console.log(hex);

/* https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value

 function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ('0' + parseInt(x).toString(16)).slice(-2);
  }
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
} */
