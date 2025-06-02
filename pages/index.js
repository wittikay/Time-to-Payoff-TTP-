import { calculatePayoff } from "../utils/payoffCalculator.js";

console.log("Coded by wittikay");

// DOM Elements
const form = document.querySelector(".calculator__form");
const amountId = document.getElementById("amount");
const interestId = document.getElementById("interest");
const monthlyPaymentId = document.getElementById("monthly-payment");
const monthlyFeeId = document.getElementById("monthly-fee");
const output = document.querySelector("#time-to-payoff");

// Event Handler
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // Get input values from previously defined variables
  const amountInputted = parseFloat(amountId.value);
  const interestInputted = parseFloat(interestId.value);
  const monthlyPayment = parseFloat(monthlyPaymentId.value);
  const monthlyFee = parseFloat(monthlyFeeId.value) || 0; // Default to 0 if not provided

  output.textContent = calculatePayoff(
    amountInputted,
    interestInputted,
    monthlyPayment,
    monthlyFee
  );

  // TODO: add validation for the inputted values to ensure they are numbers and not negative.
  // TODO: if monthly payment is <= 0, output a message saying "Monthly payment must be greater than 0." and return.
  // TODO: if amountInputted is <= 0, output a message saying "Congratulations! You either have no debt, paid off your debt, or are trying to break the calculator!" and return.
  // TODO: if interestInputted is < 0, output a message saying "Interest rates that are negative indicate you are being paid to borrow money, which is not realistic. Please check your inputs." and return.
  // TODO: if interestInputted is > 100, output a message saying "Interest rates above 100% are unrealistic. Please check your inputs." and return.
  // TODO: implement a validation function that ensures all inputted values are valid numbers and within realistic ranges before proceeding with the calculation.
  // TODO: add an optional field for fees or additional costs that could affect the monthly payment or balance, and adjust the calculation accordingly.
  // TODO: style the calculator form and output to make it more visually appealing and user-friendly.
});
