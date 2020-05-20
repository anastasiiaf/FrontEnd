document.addEventListener('DOMContentLoaded', () => {
  let gridContainer = document.getElementById('#grid');
  //let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.getElementById('#score');
  const startBtn = document.getElementById('#startBtn');
  //let width = 30;
  let grid = [];
  const width = createGrid();
  // Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const theTetrominoes = [lTetromino];

  let currentPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);

  let current = theTetrominoes[random][currentRotation];

  //draw
  function draw() {
    current.forEach((index) => {
      console.log(width);
      grid[currentPosition + index].classList.add('tetromino');
    });
  }

  //undraw
  function undraw() {
    current.forEach((index) => {
      console.log(width);
      grid[currentPosition + index].classList.remove('tetromino');
    });
  }

  //create grid
  function createGrid() {
    let positionInfo = gridContainer.getBoundingClientRect();
    let gridHeight = positionInfo.height;
    let gridWidth = positionInfo.width;

    for (let i = 0; i < (gridHeight * gridWidth) / 400; i++) {
      let square = document.createElement('div');
      square.setAttribute('class', 'square');
      gridContainer.appendChild(square);
      grid.push(square);
    }
    let tableWidth = Math.floor(gridWidth / 20);
    return tableWidth;
  }

  //draw();
});
