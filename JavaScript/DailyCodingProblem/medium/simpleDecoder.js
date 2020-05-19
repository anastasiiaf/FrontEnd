/*
Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, 
count the number of ways it can be decoded.

For example, the message '111' would give 3, since it could be 
decoded as 'aaa', 'ka', and 'ak'.

You can assume that the messages are decodable. 
For example, '001' is not allowed.
*/
var alphabet = [
  ' ',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function simpleDecoder(message) {
  var messageList = message.split('');
  console.log('Straightforward decoder:');
  console.log(straightDecoder(messageList));
  console.log('Starting with first digit as a letter decoder:');
  console.log(oneDigitsLetterFirstDecoder(messageList));
  console.log('Starting with first two digits as a letter decoder:');
  console.log(twoDigitsLetterFirstDecoder(messageList));
}

function oneDigitsLetterFirstDecoder(messageList) {
  var result3 = [];
  result3[0] = alphabet[messageList[0]];
  var i = 1;
  var k = 1;
  while (i < messageList.length) {
    var letter = Number(messageList[i] + messageList[i + 1]);
    if (letter <= alphabet.length) {
      result3[k] = alphabet[letter];
      i = i + 2;
    } else {
      result3[k] = alphabet[messageList[i]];
      i++;
    }
    k++;
    //console.log(result2);
  }
  return result3.join('');
}

function twoDigitsLetterFirstDecoder(messageList) {
  var result2 = [];
  //result2[0] = messageList[0];
  var i = 0;
  var k = 0;
  while (i < messageList.length) {
    var letter = Number(messageList[i] + messageList[i + 1]);
    if (letter <= alphabet.length) {
      result2[k] = alphabet[letter];
      i = i + 2;
    } else {
      result2[k] = alphabet[messageList[i]];
      i++;
    }
    k++;
    //console.log(result2);
  }
  return result2.join('');
}

function straightDecoder(messageList) {
  var result = '';
  messageList.forEach(function (el) {
    result += alphabet[el];
  });
  return result;
}

var message = '112345';
simpleDecoder(message);
