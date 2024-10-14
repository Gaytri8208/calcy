const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');

let currentInput = '';
let operator = '';
let previousInput = '';

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.innerText;
        const action = key.dataset.action;

        if (key.dataset.number) {
            currentInput += keyValue;
            updateDisplay(currentInput);
        }

        if (action === 'clear') {
            clearCalculator();
        }

        if (action === 'calculate') {
            calculate();
        }

        if (key.dataset.operator) {
            handleOperator(key.dataset.operator);
        }
    });
});

function updateDisplay(value) {
    display.value = value;
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}
