const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const clearBtn = document.querySelector("[data-clear]");
const equalBtn = document.querySelector("[data-equals]");
const decimalBtn = document.querySelector("[data-point]");
const screenDiv = document.querySelector("[data-screen]");
const calcScreen = document.querySelector("[data-input]");

let firstValue = "0";
let secondValue = "";
let evaluation = "";
let needsReset = false;

window.addEventListener("load", clearScreen())

/* Click Event Listeners for each number, operator, and clear button. */

numberBtns.forEach((button) =>
    button.addEventListener("click", () => printNum(button.textContent))
);

operatorBtns.forEach((button) =>
    button.addEventListener("click", () => storeValues(button.textContent))
);

clearBtn.addEventListener("click", () => clearScreen());

equalBtn.addEventListener("click", () => evaluate());

decimalBtn.addEventListener("click", () => placeDecimal());

window.addEventListener("keydown", keyboardInput);

/* Print the clicked number on the display screen in succession. */

function printNum(num) {
    if (calcScreen.textContent === "0" || calcScreen.textContent === firstValue || needsReset === true) resetScreen()
    calcScreen.textContent += num;
}

function placeDecimal() {
    if (needsReset) resetScreen();
    if (calcScreen.textContent === "") calcScreen.textContent = "0";
    if (calcScreen.textContent.includes(".")) return;
    calcScreen.textContent += ".";
}

/* Evaluates the function based on user input. Signals to reset the screen for next user input. */

function storeValues(operator) {
    if (firstValue === "" || evaluation === "" ) {
    firstValue = parseFloat(calcScreen.textContent);
    evaluation = operator;
    console.log(firstValue);
    console.log(secondValue);
    console.log(evaluation);
    } else if (firstValue !== "") {
        evaluate();
        evaluation = operator;
    }
    needsReset = true;
}

  /*Takes keyboard/numpad input and returns same results as clicking each button. */

  function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) parseFloat(printNum(e.key));
    if (e.key === ".") placeDecimal();
    if (e.key === "=") evaluate();
    if (e.key === "Escape") clearScreen();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
      storeValues(e.key);
}

/* Clearing/Resetting the Screen */

function clearScreen() {
    calcScreen.textContent="0";
    firstValue = "";
    secondValue = "";
    evaluation = "";
}

function resetScreen() {
    calcScreen.textContent="";
    needsReset = false;
}

/* Math Functions for addition, subtraction, multiplication, and division. */

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
    if ( b === 0 || b === "" || b === null ){
        alert("You cannot divide by Zero in this universe.");
    } else
    return a / b;
}

/* Function to choose the correct math function based on user input. */

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

function evaluate() {
    if (evaluation === "") {
    firstValue = calcScreen.textContent;
    return firstValue;
    } else
    secondValue = parseFloat(calcScreen.textContent);
    console.log(firstValue);
    console.log(secondValue);
    console.log(evaluation);
    calcScreen.textContent = roundResult(
        operate(evaluation, firstValue, secondValue)
        );
    firstValue = parseFloat(calcScreen.textContent);
    secondValue = "";
    evaluation = "";
    needsReset = true;
}

/* Round Result */
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }