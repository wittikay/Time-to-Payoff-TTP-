export function calculatePayoff(
  amountInputted,
  interestInputted,
  monthlyPayment
) {
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
    return "Data provided is unrealistic. Please check your inputs."; // if the months variable is NaN or infinite, we output an error message.
  } else if (months >= 12) {
    // convert to years
    const years = Math.floor(months / 12); // if the months variable is greater than or equal to 12, we convert it to years for a more accurate output. this also rounds the number down to the nearest whole number so we don't have a fraction of a year.
    if (years >= 100) {
      // if years is greater than or equal to 100, we output a special message.
      return "Payoff time is 100 years or longer.";
    } else {
      return `It will take you ${years} years to pay off your balance.`; // here we output the result to the user.
    }
  } else if (months <= 1) {
    // convert to days
    const days = Math.ceil(months * 30); // if the months variable is less than or equal to 1, we convert it to days for a more accurate output. this also rounds the number up to the nearest whole number so we don't have a fraction of a day.
    return `It will take you ${days} days to pay off your balance.`; // here we output the result to the user.
  } else if (months > 1 && months < 12) {
    // if the months variable is greater than 1 but less than 12, we output the result in months.
    return `It will take you ${Math.ceil(
      months
    )} months to pay off your balance.`; // here we output the result to the user. this also rounds the number up to the nearest whole number so we don't have a fraction of a month.
  }

  return "An unexpected error occurred. Please try again."; // if none of the above conditions are met, we output a generic error message.
}
