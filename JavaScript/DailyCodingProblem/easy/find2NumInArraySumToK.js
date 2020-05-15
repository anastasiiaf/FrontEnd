/* Given a list of numbers and a number k, return whether any two numbers 
from the list add up to k. For example, given [10, 15, 3, 7] and k of 17,
return true since 10 + 7 is 17.
*/

function findSumK(list, k) {
  console.log('Result is:');
  for (var i = list.length - 1; i >= 0; i--) {
    var num1 = list[i];
    var num2 = k - num1;
    var index = list.indexOf(num2);
    if (index !== -1) {
      var result = num1 + ' + ' + num2 + ' = ' + k;
      console.log(result);
    }
    list.splice(i, 1);
  }
}

var list = [9, 7, 5, 3];
var k = 12;
findSumK(list, k);
