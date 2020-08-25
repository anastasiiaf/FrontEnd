/*
Write a isValidPassword function, which accepts 2 arguments: password and username
Password must:
- be at least 8 characters
- cannot contain spaces
- cannot contain username

If all requirements are met, return true
*/

function isValidPassword(password, username) {
  if (password.includes(username) || password.length < 8 || password.includes(' ')) {
    return false;
  } else {
    return true;
  }
}
console.log('task 1:');
console.log(isValidPassword('user1234', 'userdsgdf'));

/*
Write a function to find the average value in an array of numbers
*/

function avg(arr) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return arr.reduce(reducer) / arr.length;
}
console.log('task 2:');
console.log(avg([1, 2, 3, 4]));

/*
Write a function called isPangram, which checks to see if a given sentence
contains every letter of the alphabet. Ignore string casing
*/

function isPangram(sentence) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  alphabet = alphabet.split('');
  sentence = sentence.toLowerCase();
  sentence = sentence.split('');
  sentence = sentence.filter((value) => {
    return value !== ' ';
  });
  console.log(sentence);
  return sentence.every((value) => {
    if (alphabet.includes(value)) {
      return true;
    } else {
      return false;
    }
  });

  /* checks for unique letters only
  return sentence.every((value) => {
    if (alphabet.includes(value)) {
      alphabet.splice(alphabet.indexOf(value), 1);
      console.log(value, alphabet);
      return true;
    } else {
      return false;
    }
  });
  */
}
console.log('task 3:');
console.log(isPangram('The five boxing wizards jump quickly'));

/*
Write a getCard function which returns a random playing card object, like:
{
  value: "K",
  suit: "clubs"
}

Pick a random value from:
1 2 3 4 5 6 7 8 9 10 J Q K A
Pick a random suit from:
clubs, spades, hearts, diamonds
Return both in an object
*/

function getCard() {
  const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suit = ['clubs', 'spades', 'hearts', 'diamonds'];
  return {
    value: value[Math.floor(Math.random() * value.length)],
    suit: suit[Math.floor(Math.random() * suit.length)],
  };
}
console.log('task 4:');
console.log(getCard());
