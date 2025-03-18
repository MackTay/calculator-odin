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

let displayVal = display.textContent;

function calculate() {
    let total = equation.value;
    let operator = equation.operand;
    let val2 = displayVal;
    val2 = !equation.negativeCheck ? +val2 : -val2;
    expectingNew = true;
    if (!operator) {
        return total;
    } else {
        switch (operator) {
            case 'multiply':
                return total *= val2;
            case 'divide':
                return total /= val2;
            case 'add':
                return total += val2;
            case 'subtract':
                return total -= val2;
        }
    }
}


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
