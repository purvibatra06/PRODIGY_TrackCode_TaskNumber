const tempInput = document.getElementById('temp');
const unitSelect = document.getElementById('unit');
const convertButton = document.getElementById('convert');
const resultParagraph = document.getElementById('result');

convertButton.addEventListener('click', convertTemperature);

function convertTemperature() {
  const tempValue = parseFloat(tempInput.value);
  const unitValue = unitSelect.value;

  if (isNaN(tempValue)) {
    showError('Please enter a valid temperature');
    return;
  }

  let convertedTemp;
  let convertedUnit;

  switch (unitValue) {
    case 'Celsius':
      if (tempValue < -273.15) {
        showError('Temperature cannot be below absolute zero');
        return;
      }
      convertedTemp = (tempValue * 9 / 5) + 32;
      convertedUnit = 'Fahrenheit';
      break;
    case 'Fahrenheit':
      if (tempValue < -459.67) {
        showError('Temperature cannot be below absolute zero');
        return;
      }
      convertedTemp = (tempValue - 32) * 5 / 9;
      convertedUnit = 'Celsius';
      break;
    case 'Kelvin':
      if (tempValue < 0) {
        showError('Temperature cannot be below absolute zero');
        return;
      }
      convertedTemp = tempValue - 273.15;
      convertedUnit = 'Celsius';
      break;
    default:
      showError('Please select a valid unit');
      return;
  }

  resultParagraph.textContent = `The converted temperature is ${convertedTemp.toFixed(2)} ${convertedUnit}`;

  
  setTimeout(() => {
    resultParagraph.textContent = '';
  }, 10000);
}

function showError(message) {
  alert(message);
  resultParagraph.textContent = '';
}
