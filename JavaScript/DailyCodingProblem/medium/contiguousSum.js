/*
Given a list of integers (size K) and a number K, return which contiguous 
elements of the list sum to K.
*/

function contiguousSum(k) {
  let contiguousArr = populateArray(k);
  console.log(contiguousArr);
  let result = [];
  for (let i = 0; i < k; i++) {
    let notContiguous = true;
    let sum = contiguousArr[i];
    let interimResult = [contiguousArr[i]];
    let j = 1;
    while (notContiguous) {
      sum += contiguousArr[i + j];
      if (sum < k) {
        interimResult.push(contiguousArr[i + j]);
      } else if (sum === k) {
        interimResult.push(contiguousArr[i + j]);
        result.push(interimResult);
        notContiguous = false;
      } else {
        interimResult = [];
        notContiguous = false;
      }
      j++;
    }
  }
  return result;
}

function populateArray(k) {
  let arr = [];
  for (let i = 0; i < k; i++) {
    arr.push(i + 1);
  }
  return arr;
}

console.log(contiguousSum(10));
