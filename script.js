// Get the display input element
const display = document.getElementById('display');
// Variable to store the current input string
let currentInput = '0';
// Variable to store the last calculated result (not directly used for display, but for logic)
let lastResult = null;
// Flag to indicate if the last action was an equals operation
let equalsPressed = false;

/**
 * Appends a number to the current input string.
 * @param {string} number - The number string to append.
 */
function appendNumber(number) {
    // If the last action was equals, start a new calculation
    if (equalsPressed) {
        currentInput = number;
        equalsPressed = false;
    } else if (currentInput === '0' && number !== '.') {
        // If current input is '0' and not appending a decimal, replace '0'
        currentInput = number;
    } else if (number === '.' && currentInput.includes('.')) {
        // Prevent multiple decimal points in a single number
        return;
    } else {
        // Append the number to the current input
        currentInput += number;
    }
    updateDisplay();
}

/**
 * Appends an operator to the current input string.
 * Prevents multiple operators consecutively.
 * @param {string} operator - The operator string to append.
 */
function appendOperator(operator) {
    equalsPressed = false; // Reset equals flag when a new operation starts
    const lastChar = currentInput.slice(-1);
    // Check if the last character is an operator
    const isLastCharOperator = ['+', '-', '*', '/'].includes(lastChar);

    if (isLastCharOperator) {
        // If the last character is an operator, replace it with the new one
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        // Otherwise, append the operator
        currentInput += operator;
    }
    updateDisplay();
}

/**
 * Clears the display and resets the current input.
 */
function clearDisplay() {
    currentInput = '0';
    lastResult = null;
    equalsPressed = false;
    updateDisplay();
}

/**
 * Deletes the last character from the current input.
 */
function deleteLast() {
    if (equalsPressed) {
        // If equals was pressed, clearing the display is more intuitive
        clearDisplay();
        return;
    }
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0'; // If nothing left, set to '0'
    }
    updateDisplay();
}

/**
 * Calculates the result of the expression in the current input.
 * Uses a try-catch block for error handling.
 */
function calculateResult() {
    try {
        // Replace '÷' with '/' and '×' with '*' for JavaScript eval
        let expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
        // Use eval() for simple calculations. In a production app,
        // a more robust parser would be used for security and accuracy.
        lastResult = eval(expression);
        currentInput = lastResult.toString();
        equalsPressed = true; // Set flag after calculation
    } catch (error) {
        currentInput = 'Error'; // Display error message
        lastResult = null;
        equalsPressed = true; // Still treat as an "equals" action
    }
    updateDisplay();
}

/**
 * Updates the display input field with the current input string.
 */
function updateDisplay() {
    display.value = currentInput;
}

// Initialize display on load
window.onload = updateDisplay;
