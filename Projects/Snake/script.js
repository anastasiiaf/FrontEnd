const gridContainer = document.getElementById('#grid');
const startBtn = document.getElementById('#startBtn');
let showScore = document.getElementById('#score');

let gridWidth = 300;
let gridHeight = 300;
let cellWidth = 15;
let cellHeight = 15;
let grid;
const width = gridWidth / cellWidth;
const height = gridHeight / cellHeight;
let cellsInTable = (gridWidth * gridHeight) / (cellWidth * cellHeight);
let timerId;
score = 0;

let snake = [2, 1, 0];
let direction = ['right', 'right', 'right'];
let currPosition = [2, 1, 0];
let nextMove = 'right';

createGrid();

startBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    game();
    timerId = setInterval(move, 600);
  }
});

function createGrid() {
  gridContainer.style.width = gridWidth + 'px';
  gridContainer.style.height = gridHeight + 'px';
  grid = [];

  let cell;
  for (let i = 0; i < cellsInTable; i++) {
    cell = document.createElement('div');

    cell.style.width = cellWidth + 'px';
    cell.style.height = cellHeight + 'px';
    //cell.textContent = i;

    if (i < width || i % width === 0 || i % width === width - 1 || i > cellsInTable - width) {
      cell.setAttribute('class', 'cell taken');
    } else {
      cell.setAttribute('class', 'cell');
    }
    gridContainer.appendChild(cell);
    grid.push(cell);
  }
}

function game() {
  draw();
  apple();
}

function draw() {
  snake.forEach((index) => {
    grid[currPosition[index]].style.backgroundColor = 'green';
  });
}

function undraw() {
  snake.forEach((index) => {
    grid[currPosition[index]].style.backgroundColor = '';
  });
}

function move() {
  //console.log(direction);
  snake.forEach((index) => {
    if (direction[index] === 'right') {
      moveRight(index);
    } else if (direction[index] === 'down') {
      moveDown(index);
    } else if (direction[index] === 'left') {
      moveLeft(index);
    } else if (direction[index] === 'up') {
      moveUp(index);
    }
  });
  /* if (grid[currPosition[0]].classList.contains('apple')) {
    grid[currPosition[0]].classList.remove('apple');
    snake.unshift(snake.length);
    currPosition.unshift(currPosition[0]);
    let lastMove = direction[0];
    direction.unshift(lastMove);
    console.log(snake, currPosition, direction);
  } */
  let lastMove = direction[0];
  direction.unshift(lastMove);
  direction.pop();
  //console.log(direction);
}

function moveRight(index) {
  if (currPosition[index] % width !== width - 1) {
    undraw();
    currPosition[index]++;
    isApple(index, 1);
    draw();
  } else {
    gameOver();
  }
}

function moveLeft(index) {
  if (currPosition[index] % width !== 0) {
    undraw();
    currPosition[index]--;
    isApple(index, -1);
    draw();
  } else {
    gameOver();
  }
}

function moveDown(index) {
  if (currPosition[index] < cellsInTable - width) {
    undraw();
    currPosition[index] += width;
    isApple(index, width);
    draw();
  } else {
    gameOver();
  }
}

function moveUp(index) {
  if (currPosition[index] > width) {
    undraw();
    currPosition[index] -= width;
    isApple(index, -width);
    draw();
  } else {
    gameOver();
  }
}

document.addEventListener('keyup', control);

function control(key) {
  if (key.keyCode === 40) {
    nextMove = 'down';
  } else if (key.keyCode === 38) {
    nextMove = 'up';
  } else if (key.keyCode === 39) {
    nextMove = 'right';
  } else if (key.keyCode === 37) {
    nextMove = 'left';
  }
  direction.unshift(nextMove);
  direction.pop();
  move();
}

function apple() {
  let i = Math.floor(Math.random() * cellsInTable);
  let except = [0, width - 1, cellsInTable - width + 1, cellsInTable - 1];
  except = except.concat(currPosition);
  console.log(except);
  while (except.includes(i) === true) {
    i = Math.floor(Math.random() * cellsInTable);
  }
  grid[i].classList.add('apple');
  grid[i].style.backgroundColor = 'red';
}

function isApple(index, step) {
  if (grid[currPosition[0]].classList.contains('apple')) {
    grid[currPosition[0]].classList.remove('apple');
    snake.unshift(snake.length);
    //console.log(snake, currPosition, direction);
    currPosition.unshift(currPosition[index] + step);
    let lastMove = direction[0];
    direction.unshift(lastMove);
    //console.log(snake, currPosition, direction);
    score += 10;
    showScore.textContent = score;
    apple();
  }
}

function gameOver() {
  showScore.textContent = 'Game over!';
  clearInterval(timerId);
}
