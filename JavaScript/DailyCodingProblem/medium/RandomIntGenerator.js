/*Given an integer n and a list of integers l, write a function that 
randomly generates a number from 0 to n-1 that isn't in l (uniform).
*/

function RandomIntegerGenerator(n, l) {
  let randomNumber = Math.round(Math.random() * (n - 1), 0);
  while (l.includes(randomNumber)) {
    randomNumber = Math.round(Math.random() * (n - 1), 0);
  }

  return randomNumber;
}

let l = [2, 8, 10, 12];
console.log(RandomIntegerGenerator(12, l));
