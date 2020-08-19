/*
Given an unsorted array of integers, find the length of the longest
consecutive elements sequence.
*/

function consSequence(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isSeq = true;
    let sequence = [];
    sequence.push(arr[i]);
    let j = 1;
    while (isSeq) {
      if (arr.indexOf(arr[i] + j) > -1) {
        sequence.push(arr[i] + j);
        j++;
      } else {
        isSeq = false;
      }
    }

    if (sequence.length > 1) {
      console.log(sequence);
    }
  }
}

const arr = [100, 4, 200, 1, 3, 2, 10];
console.log(consSequence(arr));
