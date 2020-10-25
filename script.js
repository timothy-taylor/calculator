var operateWithoutEvaluate;
var newWorkingNumber;
var workingNumber;
var activeResult;
var op;

function logEverything() {
    console.log("operatorWasPrseed = " + operatorWasPressed);
    console.log("workingNumber = " + workingNumber);
    console.log("activeResult = " + activeResult);
    console.log("op = " + op);
}

// LOGICAL FUNCTIONS
const addition = (a,b) => (a+b);
const subtraction = (a,b) => (a-b);
const multiplication = (a,b) => (a*b);
const division = (a,b) => (a/b);

const operate = (operator,a,b) => {
    console.log("Operating with " + operator + " on a and b " + a + " " + b);

    if (operator === "add") {
        result = addition(a,b);
    } else if (operator === "subtract") {
        result = subtraction(a,b);
    } else if (operator === "multiply") {
        result = multiplication(a,b);
    } else if (operator === "divide") {
        result = division(a,b);
    }
    return result;
}

const init = function() {
    operateWithoutEvaluate = false;
    operatorWasPressed = false;
    workingNumber = 0;
    activeResult = 0;
    op = "add";
}
init();

const newOperator = function(opPressed, runEvaluate) {
    if (runEvaluate) {
        evaluate();
    }
    op = opPressed;
}

const evaluate = function() {
    let result = operate(op, activeResult, workingNumber);
    activeResult = result;
}

// DOM FUNCTIONS
const updateDisplay = function(number) {
    document.getElementById('display').innerHTML = number;
    logEverything();
}
updateDisplay(activeResult);

const clear = document.getElementById("clear");
clear.addEventListener('click', function (event) {
    init();
    updateDisplay(activeResult);
});

const equals = document.getElementById("equals");
equals.addEventListener('click', function (event) {
    operateWithoutEvaluate = true;
    newWorkingNumber = true;
    evaluate();
    updateDisplay(activeResult);
});

const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach(operator => operator.addEventListener('click', function (event) { 
    newWorkingNumber = true;
    const opThatWasPressed = event.srcElement.id;
    newOperator(opThatWasPressed, !operateWithoutEvaluate);
    updateDisplay(activeResult);
    operateWithoutEvaluate = false;
}));

const numbers = Array.from(document.querySelectorAll('.number'));
numbers.forEach(number => number.addEventListener('click', function (event) {
    const numericalValue = event.target.innerHTML;
    let workingNumberString;
    if ((workingNumber == 0) || (newWorkingNumber)) {
        workingNumberString = ""; // We are inputting a new number 
    } else {
        workingNumberString = workingNumber.toString(); // We are concatenating to the existing 
    }
    workingNumber = Number(workingNumberString + numericalValue);
    newWorkingNumber = false;
    updateDisplay(workingNumber);
}));

