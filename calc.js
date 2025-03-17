// calc.js

const calc = document.querySelector(".calc");
const display = document.querySelector('#display')
 // Stores 1 value, a possible operand, and a negative check
const equation = {
    value: 0,
    operand: false,
    negativeCheck: false
};
let expectingNew = true; // Will be used to wipe display in case of numbers pressed
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
    if (event.target.tagName === "BUTTON") {
        event.target.setAttribute("style", `
            background-color: lightgray;
            border: 2px solid black;
            box-shadow: 0px 0px 0px 0px;
            `);
    }
});

calc.addEventListener('mouseup', (event) => {
    if (event.target.tagName === "BUTTON") {
        event.target.setAttribute("style", `
            background-color: #f0f0f0;
            border: 1px solid black;
            box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
            `);
    }
});
