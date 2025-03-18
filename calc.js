// calc.js

const calc = document.querySelector('.calc');
const display = document.querySelector('#display');
const zero = document.querySelector('#zero');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const decimal = document.querySelector('#decimal');
const clear = document.querySelector('#clear');
const plusMinus = document.querySelector('#plusMinus');
const percent = document.querySelector('#percent');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const equals = document.querySelector('#equals');

// Stores 1 value, a possible operand, and a negative check
const equation = {
    value: 0,
    operand: false,
    negativeCheck: false
};

// Will be used to wipe display in case of numbers pressed
let expectingNew = true;

// To be executed whenever an operand button is hit
function storeVal() {
    let val = display.textContent.substring(1);
    val = !equation.negativeCheck ? +val : -val;
    negativeCheck = false;
}

// To be executed upon hitting equals button OR any operand button if equation.operand is defined
function calculate() {
    let total = equation.value;
    let operator = equation.operand;
    let val2 = display.textContent.substring(1);
    val2 = !equation.negativeCheck ? +val2 : -val2;
    expectingNew = true;
    if (!operator) {
        return total;
    } else {
        switch (operator) {
            case 'multiply':
                total *= val2;
                break;
            case 'divide':
                total /= val2;
                break;
            case 'add':
                total += val2;
                break;
            case 'subtract':
                total -= val2;
                break;
        }
    }
}

// Number button handlers to interact with display and callback for non-zero buttons
zero.addEventListener('click', () => {
    if (displayVal === ' 0') {
        return;
    } else {
        expectingNew === true ? display.textContent = ' 0' : display.textContent += '0';
    }
});

// WHEN STARTING WITH A NEGATIVE, THIS FUNCTION REMOVES THE NEGATIVE. FIX!!!
function nonZero(number) {
    if (display.textContent.length > 6) {
        return;
    } else if (expectingNew && !equation.negativeCheck) {
        display.textContent = ' ' + number;
        expectingNew = false;
    } else if (expectingNew && equation.negativeCheck){
        display.textContent = '-' + number;
        expectingNew = false;
    } else {
        display.textContent += number;
    }
}

one.addEventListener('click', () => nonZero('1'));
two.addEventListener('click', () => nonZero('2'));
three.addEventListener('click', () => nonZero('3'));
four.addEventListener('click', () => nonZero('4'));
five.addEventListener('click', () => nonZero('5'));
six.addEventListener('click', () => nonZero('6'));
seven.addEventListener('click', () => nonZero('7'));
eight.addEventListener('click', () => nonZero('8'));
nine.addEventListener('click', () => nonZero('9'));

plusMinus.addEventListener('click', () => {
    if (equation.negativeCheck === false) {
        equation.negativeCheck = true;
        display.textContent = '-' + display.textContent.substring(1);
    } else {
        equation.negativeCheck = false;
        display.textContent = ' ' + display.textContent.substring(1);
    }
});

// Operand button listeners
multiply.addEventListener('click', () => {
    calculate(multiply);
});

// Calculator aesthetics
calc.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.setAttribute("style", `
            background-color: lightgray;
            border: 2px solid black;
            box-shadow: 0px 0px 0px 0px;
            `);
    }
});

calc.addEventListener('mouseup', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.setAttribute("style", `
            background-color: #f0f0f0;
            border: 1px solid black;
            box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
            `);
    }
});
