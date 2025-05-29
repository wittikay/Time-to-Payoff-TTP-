console.log("Coded by wittikay"); // this is a simple script that calculates the time it will take to pay off a balance based on user input. it uses the formula for calculating the number of months it will take to pay off a balance with interest. it also handles edge cases such as no interest, unrealistic inputs, and outputs the result in years, months, or days. this is version 1.2 of the script.
const form = document.querySelector(".finance__calculator-form"); // selecting the form element from the HTML so we can reference it in the listener below.
const amountId = document.getElementById("amount"); // selecting the element where the user inputs their current balance.
const interestId = document.getElementById("interest"); // selecting the element where the user inputs their interest rate.
const monthlyPaymentId = document.getElementById("monthly-payment"); // selecting the element where the user inputs their desired monthly payment amount.
const output = document.querySelector("#time-to-payoff"); // selecting the output element from the HTML, where we plan to display our months variable.
import { calculatePayoff } from "../scripts/payoffCalculator.js"; // importing the calculatePayoff function from the scripts folder, which contains the logic for calculating the payoff time based on user input.
form.addEventListener("submit", (evt) => {
  // this listener waits for the form submission before reading the values and calculating our desired output.
  evt.preventDefault();
  const amountInputted = parseFloat(amountId.value); // this converts the value inputted in the amount field to a float so we can do math with it.
  const interestInputted = parseFloat(interestId.value); // this converts the value inputted in the interest field to a float so we can do math with it.
  const monthlyPayment = parseFloat(monthlyPaymentId.value); // this converts the value inputted in the monthly payment field to a float so we can do math with it.

  output.textContent = calculatePayoff(
    amountInputted,
    interestInputted,
    monthlyPayment
  ); // this calls the calculatePayoff function with the inputted values to calculate the payoff time and display it in the output element.
  // TODO: add validation for the inputted values to ensure they are numbers and not negative.
  // TODO: if monthly payment is >= amountInputted, output a message saying "You can pay off your balance immediately." and return.
  // TODO: if monthly payment is <= 0, output a message saying "Monthly payment must be greater than 0." and return.
  // TODO: if amountInputted is <= 0, output a message saying "Congratulations! You either have no debt, paid off your debt, or are trying to break the calculator!" and return.
  // TODO: if interestInputted is < 0, output a message saying "Interest rates that are negative indicate you are being paid to borrow money, which is not realistic. Please check your inputs." and return.
  // TODO: if interestInputted is > 100, output a message saying "Interest rates above 100% are unrealistic. Please check your inputs." and return.
  // TODO: implement a validation function that ensures all inputted values are valid numbers and within realistic ranges before proceeding with the calculation.
  // TODO: add an optional field for fees or additional costs that could affect the monthly payment or balance, and adjust the calculation accordingly.
  // TODO: style the calcualtor form and output to make it more visually appealing and user-friendly.
});
