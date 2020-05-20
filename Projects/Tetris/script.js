document.addEventListener('DOMContentLoaded', () => {
  let gridContainer = document.getElementById('#grid');
  let showNextGridContainer = document.getElementById('#next-grid');
  const scoreDisplay = document.getElementById('#score');
  const startBtn = document.getElementById('#startBtn');
  //let width = 30;
  let grid = [];
  let positionInfo = gridContainer.getBoundingClientRect();
  let gridHeight = positionInfo.height;
  let gridWidth = positionInfo.width;
  const width = createGrid();

  // Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const theTetrominoes = [lTetromino];

  let currentPosition = width / 2;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);

  let current = theTetrominoes[random][currentRotation];

  document.addEventListener('keyup', control);
  timerId = setInterval(moveDown, 1000);

  //create grid
  function createGrid() {
    let squaresInGrid = (gridHeight * gridWidth) / 400;
    let tableWidth = Math.floor(gridWidth / 20);
    for (let i = 0; i < squaresInGrid + tableWidth; i++) {
      let square = document.createElement('div');
      if (i < squaresInGrid) {
        square.setAttribute('class', 'square');
      } else {
        square.setAttribute('class', 'taken');
      }
      gridContainer.appendChild(square);
      grid.push(square);
    }
    return tableWidth;
  }

  // create grid to display upcoming tetromino
  function showNextTetromino() {
    for (let i = 0; i < 16; i++) {
      let square = document.createElement('div');
        square.setAttribute('class', 'square');
        showNextGridContainer.appendChild(square);
  }

  // select tetromino and set current position
  function nextTetromino() {
    currentPosition = width / 2;
    currentRotation = 0;
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
  }

  //draw
  function draw() {
    current.forEach((index) => {
      grid[currentPosition + index].classList.add('tetromino');
    });
  }

  //undraw
  function undraw() {
    current.forEach((index) => {
      grid[currentPosition + index].classList.remove('tetromino');
    });
  }
  // move down every second

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) => grid[currentPosition + index + width].classList.contains('taken'))
    ) {
      current.forEach((index) => grid[currentPosition + index].classList.add('taken'));

      nextTetromino();
      draw();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }
    if (current.some((index) => grid[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) {
      currentPosition += 1;
    }
    if (current.some((index) => grid[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // assigning functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      //move down faster
    }
  }
});
