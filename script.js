const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// calculate first & second values depending on operator
const calculate = {
    '/':(firstNumber, SecondNumber) => firstNumber / SecondNumber,
    
    '*':(firstNumber, SecondNumber) => firstNumber * SecondNumber,
    
    '+':(firstNumber, SecondNumber) => firstNumber + SecondNumber,
    
    '-':(firstNumber, SecondNumber) => firstNumber - SecondNumber,
    
    '=':(firstNumber, SecondNumber) => SecondNumber,

};

function sendNumberValue(number) {
    // replace current Display value if first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0 replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue == '0' ? number :  displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if(awaitingNextValue) return;
    // If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function userOperator(operator) { 
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple opertor
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;    
        return
    }
    // Assign first value if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Reset all Values, display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Event Listeners for Numbers, operators and Decimal
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
     inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value)); 
    } else if(inputBtn.classList.contains('operator')) {
     inputBtn.addEventListener('click', () => userOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
     inputBtn.addEventListener('click', () => addDecimal());
    }
 });

clearBtn.addEventListener('click', resetAll);
