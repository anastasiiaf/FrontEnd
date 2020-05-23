const gridContainer = document.getElementById('#grid');
const startBtn = document.getElementById('#startBtn');

let gridWidth = 300;
let gridHeight = 300;
let cellWidth = 15;
let cellHeight = 15;
let grid;
const width = gridWidth / cellWidth;
let timerId;

let snake = [2, 1, 0];
let direction = ['right', 'right', 'right'];
let currPosition = [2, 1, 0];

createGrid();
//draw();
//undraw();

startBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(move, 1000);
  }
});

function createGrid() {
  gridContainer.style.width = gridWidth + 'px';
  gridContainer.style.height = gridHeight + 'px';
  grid = [];
  let cellsInTable = (gridWidth * gridHeight) / (cellWidth * cellHeight);
  let cell;
  for (let i = 0; i < cellsInTable; i++) {
    cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.style.width = cellWidth + 'px';
    cell.style.height = cellHeight + 'px';
    //cell.textContent = i;
    gridContainer.appendChild(cell);
    grid.push(cell);
  }
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
  snake.forEach((index) => {
    if (direction[index] === 'right') {
      moveRight(index);
    } else if (direction[index] === 'down') {
      moveDown(index);
    }
  });
  let lastMove = direction[0];
  direction.unshift(lastMove);
  direction.pop();
}

function moveRight(index) {
  undraw();
  currPosition[index]++;
  draw();
}

function moveDown(index) {
  undraw();
  currPosition[index] += width;
  draw();
}

document.addEventListener('keyup', control);

function control(key) {
  if (key.keyCode === 40) {
    direction.unshift('down');
    direction.pop();
    move();
  }
}
