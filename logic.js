var operateWithoutEvaluate;
var newWorkingNumber;
var workingNumber;
var activeResult;
var op;
var includeDecimal;

function logEverything() {
    console.log("includeDecimal = " + includeDecimal);
    console.log("workingNumber = " + workingNumber);
    console.log("activeResult = " + activeResult);
    console.log("op = " + op);
}

// MATH & LOGICAL FUNCTIONS
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

const init = () => {
    operateWithoutEvaluate = false;
    includeDecimal = false;
    workingNumber = 0;
    activeResult = 0;
    op = "add";
}
init();

const newOperator = (opPressed, runEvaluate) => {
    if (runEvaluate) {
        evaluate();
    }
    op = opPressed;
}

const evaluate = () => {
    let result = Number(operate(op, activeResult, workingNumber));
    if (!Number.isInteger(result)) {
        result = result.toFixed(2);
    }
    activeResult = result;
}

const numberPressed = (inputNumber) => {
    let workingNumberString;
    if ((workingNumber === 0) || (newWorkingNumber)) {
        workingNumberString = ""; // We are inputting a new number 
    } else {
        workingNumberString = workingNumber.toString(); // We are concatenating to the existing 
    }
    if (includeDecimal) {
        workingNumber = Number(workingNumberString + '.' + inputNumber);
        includeDecimal = false;
    } else {
        workingNumber = Number(workingNumberString + inputNumber);
    }
    newWorkingNumber = false;
    updateDisplay(workingNumber);
}

const decimalPressed = () => {
    if (!includeDecimal && Number.isInteger(workingNumber)) {
        workingNumber = workingNumber + 0.00;
        newWorkingNumber = false;
        includeDecimal = true;
        updateDisplay(workingNumber.toFixed(2));
    } else {
        return;
    }
}

const nonNumberParser = (elementId) => {
    newWorkingNumber = true;
    if (elementId === 'equals') {
        operateWithoutEvaluate = true;
        evaluate();
        updateDisplay(activeResult);
    } else if (elementId === 'clear') {
        init();
        updateDisplay(activeResult);
    } else if (elementId === 'random') {
        const randomNumber = Math.random() * 1000;
        workingNumber = randomNumber.toFixed(2);
        updateDisplay(workingNumber);
    } else if (elementId === 'absolute') {
        if (workingNumber<=0) {
            workingNumber = Math.abs(workingNumber);
        } else {
            workingNumber = -Math.abs(workingNumber);
        }
        updateDisplay(workingNumber);
    } else if (elementId === 'decimal') {
        decimalPressed();
    } else {
        newOperator(elementId, !operateWithoutEvaluate);
        updateDisplay(activeResult);
        operateWithoutEvaluate = false;
    }
}
