function vowelsAndConsonants(s) {
  const vowels = 'aeiou';
  let vowelRegex = new RegExp(`[${vowels}]`, 'gi');
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`, 'gi');
  let word = s.split('');

  console.log('using map');
  // print vowels
  word.map(function (el) {
    if (vowels.includes(el)) {
      console.log(el);
    }
  });

  // print conosants
  word.map(function (el) {
    if (vowels.includes(el) === false) {
      console.log(el);
    }
  });

  // using loops
  console.log('using loops...');
  let cons = [];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      console.log(word[i]);
    } else {
      cons.push(word[i]);
    }
  }

  for (let i = 0; i < cons.length; i++) {
    console.log(cons[i]);
  }
}

vowelsAndConsonants('javascriptloops');
