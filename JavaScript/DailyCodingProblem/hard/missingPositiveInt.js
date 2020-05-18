/*
Given an array of integers, find the first missing positive integer in 
linear time and constant space. In other words, find the lowest positive 
integer that does not exist in the array. The array can contain duplicates 
and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] 
should give 3.

You can modify the input array in-place.
*/
function missingPositiveInteger(list) {
  var max = findMax(list);
  var min = findMin(list);
  var arr = [];
  var missing = [];
  arr[0] = min;
  var i = 1;

  var dup = duplicatesArray(list);
  console.log('Duplicates array:');
  console.log(dup);

  //create a new array in range [min, max], including duplicates
  while (arr[i - 1] < max) {
    if (dup.indexOf(arr[i - 1]) !== -1) {
      arr[i] = arr[i - 1];
      dup.splice(dup.indexOf(arr[i - 1]), 1);
    } else {
      arr[i] = arr[i - 1] + 1;
    }
    i++;
  }

  console.log('New array:');
  console.log(arr);

  //compare input array with new array and remove repeating elements
  list.forEach(function (el) {
    var index = arr.indexOf(el);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      missing.push(el);
    }
  });

  //if all elements in new array were removed,
  // i.e. there is no missing elements in array, add next after max element
  if (arr.length > 0) {
    return arr;
  } else {
    arr.push(max + 1);
    return arr;
  }
}

function findMax(list) {
  var max = list[0];
  list.forEach(function (el) {
    if (el > max) {
      max = el;
    }
  });
  return max;
}

function findMin(list) {
  var min = list[0];
  list.forEach(function (el) {
    if (el < min) {
      min = el;
    }
  });
  return min;
}

function duplicatesArray(list) {
  var duplicates = [];
  var temp = list.slice(0);
  for (var i = temp.length - 1; i >= 0; i--) {
    var elem = list[i];
    temp.splice(i, 1);
    if (temp.indexOf(elem) !== -1) {
      duplicates.push(elem);
    }
  }
  return duplicates;
}

var list = [3, 2, 1, 6, 7, 6, 2, -1];
var result = missingPositiveInteger(list);
console.log('Missing elements in array:');
console.log(result);
