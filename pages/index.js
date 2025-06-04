import { calculatePayoff } from "../utils/payoffCalculator.js";

console.log("Coded by wittikay");

// DOM Elements
const form = document.querySelector(".calculator__form");
const amountId = document.getElementById("amount");
const interestId = document.getElementById("interest");
const monthlyFeeId = document.getElementById("monthly-fee");
const output = document.querySelector("#time-to-payoff");
const interestInput = document.getElementById("interest");
const interestError = document.getElementById("interest-error");
const paymentAmountId = document.getElementById("payment-amount");
const paymentFrequencyId = document.getElementById("payment-frequency");
const interestFrequencyId = document.getElementById("interest-frequency");

// Input Validation for interest

function validateInputs(amount, payment, fee, interest) {
  // Input validation
  if (isNaN(amount) || amount <= 0)
    return "Please enter a valid amount greater than 0.";
  if (isNaN(fee) || fee < 0)
    return "Please enter a valid monthly fee greater than or equal to 0.";
  if (payment <= 0) return "Monthly payment must be greater than 0.";
  if (interest === "" || isNaN(interest)) return null;
  if (interest < 0)
    return "Interest rates that are negative indicate you are being paid to borrow money, which is not realistic. Please check your inputs.";
}
validateInputs(amountId.value, paymentAmountId.value, monthlyFeeId.value, interestId.value);
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
