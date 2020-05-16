var p1Btn = document.getElementById('p1');
var p2Btn = document.getElementById('p2');
var reset = document.getElementById('reset');
var p1Display = document.getElementById('p1Display');
var p2Display = document.getElementById('p2Display');
var score = document.getElementById('score');
var scr = document.getElementById('scr');

var p1Scr = 0;
var p2Scr = 0;
var hasWon = false;

score.addEventListener('input', function () {
  scr.textContent = score.value;
});

p1Btn.addEventListener('click', function () {
  p1Scr = addScore(p1Scr, p1Display);
});

p2Btn.addEventListener('click', function () {
  p2Scr = addScore(p2Scr, p2Display);
});

reset.addEventListener('click', function () {
  resetAll();
});

function addScore(pScr, pDisplay) {
  if (pScr < Number(score.value) && hasWon === false) {
    pScr++;
    pDisplay.textContent = pScr;
    checkWinner(pScr, pDisplay);
  }
  return pScr;
}

function checkWinner(pScr, pDisplay) {
  if (pScr >= Number(score.value)) {
    hasWon = true;
    pDisplay.style.color = 'green';
  }
}

function resetAll() {
  p1Scr = p2Scr = 0;
  p1Display.textContent = p2Display.textContent = 0;
  p1Display.style.color = p2Display.style.color = 'black';
  hasWon = false;
}
