const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const clearBtn = document.querySelector("[data-clear]");
const equalBtn = document.querySelector("[data-equals]");
const decimalBtn = document.querySelector("[data-point]");
const calcScreen = document.querySelector("[data-input]");
let firstValue = "0";
let secondValue = "";
let evaluation = null;
let needsReset = false;

window.addEventListener("load", clearScreen())

numberBtns.forEach((button) =>
    button.addEventListener("click", () => printNum(button.textContent))
);

operatorBtns.forEach((button) =>
    button.addEventListener("click", () => storeValues(button.textContent))
);

clearBtn.addEventListener("click", () => clearScreen());

function printNum(num) {
    if (calcScreen.textContent === "0" || needsReset) resetScreen();
    calcScreen.textContent += num;
}

function storeValues(operator) {
    if (evaluation !== null ) evaluate();
    firstValue = calcScreen.textContent;
    evaluation = operator;
    needsReset = true;
}

function clearScreen() {
    calcScreen.textContent="0";
}

function resetScreen() {
    calcScreen.textContent="";
}

function addNumbers(a, b) {
    return a + b;
}

function subtractNumbers(a, b) {
    return a - b;
}

function multiplyNumbers(a, b) {
    return a * b;
}

function divideNumbers(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if (operator === "+" ) {
        return addNumbers(num1, num2);
    } else if (operator === "-") {
        return subtractNumbers(num1, num2);
    } else if (operator === "*") {
        return multiplyNumbers(num1, num2);
    } else if (operator === "/") {
        return divideNumbers(num1, num2);
    }
}