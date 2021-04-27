




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