const form = document.querySelector(".finance__calculator-form"); // selecting the form element from the HTML so we can reference it in the listener below.
const amountId = document.getElementById("amount"); // selecting the element where the user inputs their current balance.
const interestId = document.getElementById("interest"); // selecting the element where the user inputs their interest rate.
const monthlyPaymentId = document.getElementById("monthly-payment"); // selecting the element where the user inputs their desired monthly payment amount.
const output = document.querySelector("#time-to-payoff"); // selecting the output element from the HTML, where we plan to display our months variable.

form.addEventListener("submit", (evt) => {
  // this listener waits for the form submission before reading the values and calculating our desired output.
  evt.preventDefault();
  const amountInputted = parseFloat(amountId.value); // this converts the value inputted in the amount field to a float so we can do math with it.
  const interestInputted = parseFloat(interestId.value); // this converts the value inputted in the interest field to a float so we can do math with it.
  const monthlyPayment = parseFloat(monthlyPaymentId.value); // this converts the value inputted in the monthly payment field to a float so we can do math with it.

  let months; // this is a variable that holds the amount of time in months it will take to pay off the inputted balance.
  if (interestInputted === 0 || !interestInputted) {
    months = amountInputted / monthlyPayment; // in the event there is no interest, we simply divide the balance by the monthly payment to get our time to pay off.
  } else {
    const r = interestInputted / 100 / 12; // since we do in fact have an interest value, here we convert it into its monthly decimal form. we assign it to a shorter variable name for ease of use, in this case "r".
    months =
      Math.log(monthlyPayment / (monthlyPayment - r * amountInputted)) /
      Math.log(1 + r); // this is the formula to calculate the number of months it will take to pay off the balance with interest.
  }

  if (isNaN(months) || !isFinite(months)) {
    output.textContent =
      "Data provided is unrealistic. Please check your inputs."; // if the months variable is NaN or infinite, we output an error message.
  } else if (months >= 12) {
    // convert to years
    const years = Math.floor(months / 12); // if the months variable is greater than or equal to 12, we convert it to years for a more accurate output.
    if (years >= 100) {
      // if years is greater than or equal to 100, we output a special message.
      output.textContent = "Payoff time is 100 years or longer.";
    } else {
      output.textContent = `It will take you ${years} years to pay off your balance.`; // here we output the result to the user.
    }
  } else if (months <= 1) {
    // convert to days
    const days = Math.ceil(months * 30); // if the months variable is less than or equal to 1, we convert it to days for a more accurate output.
    output.textContent = `It will take you ${days} days to pay off your balance.`; // here we output the result to the user.
  } else if (months > 1 && months < 12) {
    // if the months variable is greater than 1 but less than 12, we output the result in months.
    output.textContent = `It will take you ${Math.ceil(
      months
    )} months to pay off your balance.`; // here we output the result to the user.
  }
});
