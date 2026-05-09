const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let state = {
  currentInput:      "0",
  previousInput:     "",
  operator:          null,
  shouldResetScreen: false,
};

const updateDisplay = (value) => {
  display.textContent = value;


};

//------

const calculate = (a, b, op) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (op === "+") return numA + numB;
  if (op === "-") return numA - numB;
  if (op === "*") return numA * numB;
  if (op === "/") {
    if (numB === 0) return "Error";
    return numA / numB;
  }
};

//------

const handleNumber = (value) => {
  if (state.shouldResetScreen) {
    state.currentInput = value;
    state.shouldResetScreen = false;
  } else {
    state.currentInput =
      state.currentInput === "0" ? value : state.currentInput + value;
  }
  updateDisplay(state.currentInput);
};

const handleOperator = (value) => {
  if (state.operator && !state.shouldResetScreen) {
    const result = calculate(state.previousInput, state.currentInput, state.operator);
    state.currentInput = String(parseFloat(result.toFixed(10)));
    updateDisplay(state.currentInput);
  }
  state.previousInput     = state.currentInput;
  state.operator          = value;
  state.shouldResetScreen = true;
};

const handleEquals = () => {
  if (!state.operator || !state.previousInput) return;
  const result = calculate(state.previousInput, state.currentInput, state.operator);
  state.currentInput      = String(parseFloat(result.toFixed(10)));
  state.previousInput     = "";
  state.operator          = null;
  state.shouldResetScreen = true;
  updateDisplay(state.currentInput);
};

const handleClear = () => {
  state = { currentInput: "0", previousInput: "", operator: null, shouldResetScreen: false };
  updateDisplay("0");
};

const handleBackspace = () => {
  state.currentInput =
    state.currentInput.length <= 1 ? "0" : state.currentInput.slice(0, -1);
  updateDisplay(state.currentInput);
};

//------

const operatorKeys = ["+", "-", "*", "/"];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

// https://gsap.com/docs/v3/GSAP/gsap.to()/
// we use gsap.to() to spin the button on every click

    gsap.to(button, { rotation: "+=360", duration: 0.4 });

    if      (value === "C")                    handleClear();
    else if (value === "backspace")            handleBackspace();
    else if (value === "=")                    handleEquals();
    else if (operatorKeys.includes(value))     handleOperator(value);
    else                                       handleNumber(value);

  });
});


// https://gsap.com/docs/v3/GSAP/gsap.from()/
// we use gsap.from() to slide the calculator up when we load the page

gsap.from(".wrapper", { opacity: 0, y: 100, duration: 2.0,});

updateDisplay(state.currentInput);