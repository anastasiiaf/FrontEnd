/*
Given a 2D board of characters and a word, find if the word exists in the grid.
The word can be constructed from letters of sequentially adjacent cell,
where "adjacent" cells are those horizontally or vertically neighboring. 
The same letter cell may not be used more than once.
*/

function exists(board, word) {
  let firstLetter = word[0];

  console.log(findFirstLetterPosition(board, firstLetter));
  return board.length;
}

function findFirstLetterPosition(board, firstLetter) {
  let pos = [];

  for (let i = 0; i < board.length; i++) {
    let col = board[i].indexOf(firstLetter);
    if (col > -1) {
      let posOfPrevEl = 0;
      let isInRow = true;
      console.log(i);

      while (isInRow) {
        let el = board[i].indexOf(firstLetter, posOfPrevEl);
        if (el > -1) {
          posOfPrevEl = el + 1;
          pos.push([i, el]);
        } else {
          isInRow = false;
        }
      }
    }
  }
  return pos;
}

let board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];

console.log(exists(board, 'EEE'));
