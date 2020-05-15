/* Given an array of integers, return a new array such that 
each element at index i of the new array is the product of all 
the numbers in the original array except the one at i.
For example, if our input was [1, 2, 3, 4, 5], the expected 
output would be [120, 60, 40, 30, 24]. If our input 
was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?*/

// Splice affects original array: arrays in JS are objects
// and variables only hold a reference to an object, not the object itself
// https://stackoverflow.com/questions/6612385/why-does-changing-an-array-in-javascript-affect-copies-of-the-array

function product(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    var listWithNoI = arr.slice(0);
    listWithNoI.splice(i, 1);
    var newElem = 1;
    listWithNoI.forEach(function (el) {
      newElem *= el;
    });
    result[i] = newElem;
  }
  console.log(result);
}

var list = [1, 2, 3, 4, 5];
product(list);
