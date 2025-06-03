import { calculatePayoff } from "../utils/payoffCalculator.js";

console.log("Coded by wittikay");

// DOM Elements
const form = document.querySelector(".calculator__form");
const amountId = document.getElementById("amount");
const interestId = document.getElementById("interest");
const monthlyPaymentId = document.getElementById("monthly-payment");
const monthlyFeeId = document.getElementById("monthly-fee");
const output = document.querySelector("#time-to-payoff");
const interestInput = document.getElementById("interest");
const interestError = document.getElementById("interest-error");
const paymentAmountId = document.getElementById("payment-amount");
const paymentFrequencyId = document.getElementById("payment-frequency");
const interestFrequencyId = document.getElementById("interest-frequency");

// Input Validation for interest
interestInput.addEventListener("input", () => {
  const value = parseFloat(interestInput.value);
  if (value > 99) {
    interestError.textContent = "Interest cannot be greater than 99%.";
  } else {
    interestError.textContent = "";
  }
});

// Event Handler
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // Get input values from previously defined variables
  const amountInputted = parseFloat(amountId.value);
  const interestInputted = parseFloat(interestId.value);
  const paymentAmount = parseFloat(paymentAmountId.value);
  const monthlyFee = parseFloat(monthlyFeeId.value) || 0; // Default to 0 if not provided
  const paymentFrequency = paymentFrequencyId.value;
  const interestFrequency = interestFrequencyId.value;

  output.textContent = calculatePayoff(
    amountInputted,
    interestInputted,
    paymentAmount,
    monthlyFee,
    paymentFrequency,
    interestFrequency
  );
});

// TODO: if amountInputted is <= 0, output a message saying "Congratulations! You either have no debt, paid off your debt, or are trying to break the calculator!" and return.
// TODO: implement a validation function that ensures all inputted values are valid numbers and within realistic ranges before proceeding with the calculation.
