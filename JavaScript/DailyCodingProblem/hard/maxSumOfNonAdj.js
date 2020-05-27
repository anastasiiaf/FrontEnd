/* Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

Follow-up: Can you do this in O(N) time and constant space? */

function maxSumOfNonAdj(list) {
  var max = list[0];
  for (var j = 0; j < list.length; j++) {
    max = changeStep(max, list, j);
  }
  return max;
}

function changeStep(max, list, index) {
  var step = 2;
  for (var step = 2; step < list.length; step++) {
    max = maxSum(max, list, step, index);
  }
  return max;
}

function maxSum(max, list, step, index) {
  var el = null;
  var l = [];
  for (var i = index; i < list.length; i += step) {
    el += list[i];
    l.push(list[i]);
    if (el > max) {
      max = el;
      maxList = l;
    }
  }

  //console.log(l);
  //console.log(max);
  return max;
}

var list = [-2, 5, 6, 2, -7, 10, 0, 4, 5];
var maxList = [];
var result = maxSumOfNonAdj(list);
console.log(maxList, ' = ', result);
