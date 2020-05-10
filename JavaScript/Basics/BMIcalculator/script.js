let height = document.getElementById('height');
let weight = document.getElementById('weight');
let bmi = document.getElementById('bmi');
let summary = document.getElementById('summary');
const calcBtn = document.getElementById('calculate');

function calcBMI() {
  if (weight.value > 0 && height.value > 0) {
    let result = Number(weight.value) / (Number(height.value) / 100) ** 2;
    result = result.toFixed(1);
    if (isNaN(result)) {
      alert('Enter valid parameters');
      bmi.textContent = '';
    } else {
      if (result < 18.5) {
        summary.textContent = 'You are UNDERWEIGHT. Go eat something!';
      } else if (result >= 18.5 && result <= 24.9) {
        summary.textContent = 'You are NORMAL. Well done!';
      } else if (result >= 25 && result <= 29.9) {
        summary.textContent = 'You are OVERWEIGHT. Time to train!';
      } else {
        summary.textContent = 'Your are OBESE. This is serious!';
      }

      bmi.textContent = result;
    }
  }
}

calcBtn.addEventListener('click', calcBMI);
