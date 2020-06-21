/* Given an array of integers where every integer occurs three times
 except for one integer, which only occurs once, find and return 
 the non-duplicated integer.

For example, given [6, 1, 3, 3, 3, 6, 6], return 1. 
Given [13, 19, 13, 13], return 19.

Do this in O(N) time and O(1) space. */

function returnNonDuplInteger(arr) {
  for (var i = 0; i < arr.length; i++) {
    var currEl = arr[i];
    var arrAfterEl = arr.slice(i + 1);
    if (arrAfterEl.indexOf(currEl) === -1) {
      return currEl;
    }
  }
}

var arr = [6, 1, 3, 3, 3, 6, 6];
console.log(returnNonDuplInteger(arr));
