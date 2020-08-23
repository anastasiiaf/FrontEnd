/*
Given a string and a set of characters,
return the shortest substring containing all the characters in the set.
*/

function shortestSubstring(word, substr) {
  let substringIndeces = [];

  for (let i = 0; i < substr.length; i++) {
    let arr = [];
    let size = 0;
    let isInWord = true;
    let prevPosition = 0;
    while (isInWord) {
      let ind = word.indexOf(substr[i], prevPosition);
      if (ind > -1) {
        arr.push(ind);
        prevPosition = ind + 1;
      } else {
        isInWord = false;
      }
    }

    if (arr.length > 0) {
      substringIndeces.push(arr);
      if (arr.length > size) {
        size = arr.length;
      }
    }
  }

  for (let j = 0; j < substringIndeces.length; j++) {}

  console.log(substringIndeces);
}

console.log(shortestSubstring('figehaeci', ['a', 'e', 'i']));
