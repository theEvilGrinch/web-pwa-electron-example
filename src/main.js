document.querySelectorAll('noscript').forEach((noscriptTag) => noscriptTag.remove());

const display = document.getElementById('display');
const memoryDisplayValue = document.getElementById('memory-section__value');
const errorDialog = document.querySelector('.js-errorDialog');
const htmlButtons = document.querySelectorAll('button');
const buttonsLogic = {
  0: {action: () => appendToDisplay(0)},
  1: {action: () => appendToDisplay(1)},
  2: {action: () => appendToDisplay(2)},
  3: {action: () => appendToDisplay(3)},
  4: {action: () => appendToDisplay(4)},
  5: {action: () => appendToDisplay(5)},
  6: {action: () => appendToDisplay(6)},
  7: {action: () => appendToDisplay(7)},
  8: {action: () => appendToDisplay(8)},
  9: {action: () => appendToDisplay(9)},
  C: {action: () => clearDisplay()},
  '/': {action: () => appendToDisplay('/')},
  '*': {action: () => appendToDisplay('*')},
  '+': {action: () => appendToDisplay('+')},
  '-': {action: () => appendToDisplay('-')},
  '.': {action: () => appendToDisplay('.')},
  '=': {action: () => calculateResult()},
  '2√': {action: () => appendToDisplay('√')},
  '^exponent': {action: () => appendToDisplay('^')},
  '%': {action: () => appendToDisplay('%')},
  'M+': {action: () => addToMemory()},
  'M-': {action: () => subtractFromMemory()},
  MR: {action: () => memoryRecall()},
  MC: {action: () => clearMemory()},
  Close: {
    action: () => {
      clearDisplay();
      errorDialog.close();
    }
  }
};

htmlButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-label') === 'Toggle theme') {
      toggleDarkMode();
    } else {
      buttonsLogic[button.textContent].action();
    }
  });
});

let memory = 0;

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function clearMemory() {
  memoryDisplayValue.innerText = '0';
  memory = 0;
}

function calculateResult() {
  try {
    const raw = display.value;

    if (!raw.trim() || !/^[\d+\-*/().\s^%√]+$/.test(raw)) {
      errorDialog.showModal();
      return;
    }

    const expression = raw
      .replace(/√(\d+)/g, 'Math.sqrt($1)')
      .replace(/(\d+)\^(\d+)/g, 'Math.pow($1, $2)')
      .replace(/(\d+)%/g, '($1 / 100)');

    display.value = Function('return ' + expression)();
  } catch {
    errorDialog.showModal();
  }
}

function addToMemory() {
  calculateResult();
  const value = parseFloat(display.value);
  if (value) {
    memory += value;
    memoryDisplayValue.innerText = memory;
    memoryDisplayValue.style.color = '#388e3c';
  }
}

function subtractFromMemory() {
  calculateResult();
  const value = parseFloat(display.value);
  if (value) {
    memory -= value;
    memoryDisplayValue.innerText = memory;
    memoryDisplayValue.style.color = '#ff9800';
  }
}

function memoryRecall() {
  display.value += memory;
}

display.addEventListener('keydown', function(event) {
  if (
    (event.code === 'Enter' || event.code === 'NumpadEnter') &&
    display.value !== ''
  ) {
    calculateResult();
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'Escape') {
    clearDisplay();
    errorDialog.close();
  }
});

function toggleDarkMode() {
  const isColorThemeDark = window.matchMedia('(prefers-color-scheme: dark)');
  isColorThemeDark.matches
    ? document.body.classList.toggle('light-mode')
    : document.body.classList.toggle('dark-mode');
}
