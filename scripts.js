const buttons = document.querySelectorAll("button");
/* buttons.forEach(button => button.addEventListener('transitionend', removeOutline));
window.addEventListener("keydown", addOutline); */

const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const clearBtn = document.querySelector("[data-clear]");
const equalBtn = document.querySelector("[data-equals]");
const decimalBtn = document.querySelector("[data-point]");
const deleteBtn = document.querySelector("[data-delete]");
const screenDiv = document.querySelector("[data-screen]");
const calcScreen = document.querySelector("[data-input]");

let firstValue;
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

deleteBtn.addEventListener("click", () => deleteNum());

equalBtn.addEventListener("click", () => evaluate());

decimalBtn.addEventListener("click", () => placeDecimal());

window.addEventListener("keydown", keypadInput);

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

/* function removeOutline(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function addOutline(e) {
    const nBtn = document.querySelector(`div[id="${e.key}]`);

    nBtn.classList.add('playing');
} */

/* Evaluates the function based on user input. Signals to reset the screen for next user input. */

function storeValues(operator) {
    if (firstValue === "" || evaluation === "" ) {
    firstValue = calcScreen.textContent;
    evaluation = operator;
    } else if (firstValue !== "") {
        evaluate();
        evaluation = operator;
    }
}

  /*Takes keyboard/numpad input and returns same results as clicking each button. */

  function keypadInput(e) {
    switch (e.key){

        case ".":
        case "decimal":
            placeDecimal();
            break;

        case "=":
        case "equals":
            evaluate();
            break;

        case "Enter":
            e.preventDefault();
            evaluate();
            break;

        case "+":
        case "plus":
        case "-":
        case "minus":
        case "/":
        case "divide":
        case "*":
        case "times":
            storeValues(e.key);
            break;

        case "0":
        case "zero":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            printNum(e.key);
            break;
        
        case "Backspace":
            deleteNum();
            break;

        case "Escape":
        case "Esc":
        case "clear":
            clearScreen();
    }
}

/* Deleting last number printed */

function deleteNum() {
    if (calcScreen.textContent.length === 1) {
        calcScreen.textContent = "0";
    } else if (calcScreen.textContent !== "0") {
        calcScreen.textContent = calcScreen.textContent.toString().slice(0, -1);
    }
}

/* Clearing/Resetting the Screen */

function clearScreen() {
    firstValue = "0";
    secondValue = "";
    evaluation = "";
    calcScreen.textContent = firstValue;
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
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case "+":
            return addNumbers(num1, num2);
        case "-":
            return subtractNumbers(num1, num2);
        case "*":
            return multiplyNumbers(num1, num2);
        case "/":
            if (num2 === 0) alert("You cannot divide by Zero in this universe.");
            else return divideNumbers(num1, num2);
    }
} 

function evaluate() {
    if (evaluation === "") {
    firstValue = calcScreen.textContent;
    return firstValue;
    } else
    secondValue = calcScreen.textContent;
    calcScreen.textContent = roundResult(
        operate(evaluation, firstValue, secondValue)
        );
    firstValue = calcScreen.textContent;
    secondValue = "";
    evaluation = "";
    needsReset = true;
}

/* Round Result */
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }