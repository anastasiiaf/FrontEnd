/*
Given an even number (greater than 2), return two prime numbers
whose sum will be equal to the given number.
A solution will always exist. See Goldbach’s conjecture.
*/

function GoldbachConjecture(evenNumber) {
  let arr = primeArray(evenNumber);
  let result = [];
  for (j = 0; j < arr.length; j++) {
    let a = arr[j];
    let b = evenNumber - a;
    if (arr.includes(b)) {
      result.push([a, b]);
    }
  }
  return result;
}

function primeArray(evenNumber) {
  let arrPrime = [2];
  for (let i = 3; i < evenNumber; i += 2) {
    if (isPrime(i)) {
      arrPrime.push(i);
    }
  }
  console.log(arrPrime);
  return arrPrime;
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(GoldbachConjecture(15));
