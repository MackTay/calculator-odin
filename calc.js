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
const subtract = document.querySelector('#subtract');
const add = document.querySelector('#add');
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
function storeVal(id) {
    let val = display.textContent.substring(1);
    val = !equation.negativeCheck ? +val : -val;
    equation.operand = id;
    equation.value = val;
    equation.negativeCheck = false;
    expectingNew = true;
}

// To be executed upon hitting equals button OR any operand button if equation.operand is defined
function calculate(id) {
    let total = equation.value;
    let operator = equation.operand;
    let val2 = display.textContent.substring(1);
    val2 = !equation.negativeCheck ? +val2 : -val2;
    if (expectingNew) {
        console.log(equation);
        return;
    } else {
        switch (operator) {
            case 'multiply':
                total *= val2;
                break;
            case 'divide':
                if (val2 == 0) {
                    display.textContent = 'gtfo';
                    equation.value = 0;
                    expectingNew = true;
                    equation.negativeCheck = false;
                    equation.operand = false;
                    return;
                } else {
                    total /= val2;
                    break;
                }
            case 'add':
                total += val2;
                break;
            case 'subtract':
                total -= val2;
                break;
    }
    }
    total = +total.toFixed(2);
    id === 'equals' ? equation.operand = false : equation.operand = id;
    total >= 0 ? display.textContent = ' ' + total : display.textContent = total.toString();
    equation.value = total;
    expectingNew = true;
    equation.negativeCheck = false; // need to fix this. Can use the above total >= 0 ? statement
    console.log('Calc:', equation);
}

function lengthLimiter() {
    console.log('LL:', equation);
    let total = equation.value;
    if (display.textContent.length > 7 &&
        display.textContent.includes('.')) {
            total >= 0 ? display.textContent = ' ' + total.toFixed(2) :
            display.textContent = total.toFixed(2).toString();
    }
    if (display.textContent.length > 7) {
        total >= 0 ? display.textContent = ' ' + total.toExponential(1) :
        display.textContent = total.toExponential(1);
    }
    if (display.textContent.length > 7) {
        display.textContent = 'err';
        equation.value = 0;
        equation.operand = false;
        equation.negativeCheck = false;
        expectingNew = true;
    }
}

// Operand button listeners
multiply.addEventListener('click', (event) => {
    let id = event.target.id;
    if (!equation.operand) {
        storeVal(id);
    } else {
        calculate(id);
    }
    lengthLimiter();
});

divide.addEventListener('click', (event) => {
    let id = event.target.id;
    if (!equation.operand) {
        storeVal(id);
    } else {
        calculate(id);
    }
    lengthLimiter();
});

add.addEventListener('click', (event) => {
    let id = event.target.id;
    if (!equation.operand) {
        storeVal(id);
    } else {
        calculate(id);
    }
    lengthLimiter();
});

subtract.addEventListener('click', (event) => {
    let id = event.target.id;
    if (!equation.operand) {
        storeVal(id);
    } else {
        calculate(id);
    }
    lengthLimiter();
});

equals.addEventListener('click', (event) => {
    let id = event.target.id;
    if (!equation.operand) {
        return;
    } else {
        calculate(id);
    }
    lengthLimiter();
});

percent.addEventListener('click', () => {
    let val = display.textContent.substring(1);
    if (equation.negativeCheck) {
        display.textContent = '-' + +val / 100;
    } else {
        display.textContent = ' ' + +val / 100;
    }
});

// Number button handlers to interact with display and callback for non-zero buttons
zero.addEventListener('click', () => {
    if (display.textContent === ' 0' || (display.textContent.length > 6 && !expectingNew)) {
        return;
    } else {
        if (expectingNew) {
            display.textContent = ' 0';
            expectingNew = false;
        } else {
            display.textContent += '0';
        }
    }
});

function nonZero(number) {
    if (display.textContent.length > 6 && !expectingNew) {
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

decimal.addEventListener('click', () => {
    if ((display.textContent.length > 6 && !expectingNew) ||
        display.textContent.includes('.')) {
        return;
    } else if (expectingNew && !equation.negativeCheck) {
        display.textContent = ' 0.';
        expectingNew = false;
    } else if (expectingNew && equation.negativeCheck){
        display.textContent = '-0.';
        expectingNew = false;
    } else {
        display.textContent += '.';
    }
});

plusMinus.addEventListener('click', () => {
    if (equation.negativeCheck === false) {
        equation.negativeCheck = true;
        display.textContent = '-' + display.textContent.substring(1);
    } else {
        equation.negativeCheck = false;
        display.textContent = ' ' + display.textContent.substring(1);
    }
    lengthLimiter();
});

clear.addEventListener('click', () => {
    display.textContent = ' 0';
    equation.value = 0;
    equation.operand = false;
    equation.negativeCheck = false;
    expectingNew = true;
});

document.addEventListener('keydown', (event) => {
    console.log('key pressed');
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', '/', '*', '-', '+', '.', '%', 'Enter'];
    const idRef = ['zero', 'one', 'two', 'three', 'four', 'five',
        'six', 'seven', 'eight', 'nine', 'divide', 'multiply',
        'subtract', 'add', 'decimal', 'percent', 'equals'];
    if (validKeys.includes(event.key)) {
        let position = validKeys.indexOf(event.key);
        let id = idRef[position];
        document.getElementById(id).click();
    } else {
        return;
    }
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
