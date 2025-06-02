export function calculatePayoff(
  amountInputted,
  interestInputted,
  monthlyPayment,
  monthlyFee = 0
) {
  let months;

  // Check for zero or negative monthly payment
  if (monthlyPayment <= 0) {
    return "Monthly payment must be greater than 0.";
  }

  // Handle monthly fee
  const effectivePayment = monthlyPayment - monthlyFee;
  if (effectivePayment <= 0) {
    return "Monthly payment must be greater than the monthly fee.";
  }

  // Calculate months to payoff
  if (!interestInputted || interestInputted === 0) {
    months = amountInputted / monthlyPayment;
  } else {
    const r = interestInputted / 100 / 12;
    months =
      Math.log(effectivePayment / (effectivePayment - r * amountInputted)) /
      Math.log(1 + r);
  }
  // Handle monthly payment being greater than or equal to the amount
  if (monthlyPayment >= amountInputted) {
    return "You can pay off your balance immediately.";
  }

  // Handle invalid or unrealistic input
  if (isNaN(months) || !isFinite(months)) {
    return "Data provided is unrealistic. Please check your inputs.";
  }

  // Output in years if 12 months or more
  if (months >= 12) {
    const years = Math.floor(months / 12);
    if (years >= 100) {
      return "Payoff time is 100 years or longer.";
    }
    return `It will take you ${years} years to pay off your balance.`;
  }

  // Output in days if 1 month or less
  if (months <= 1) {
    const days = Math.ceil(months * 30);
    return `It will take you ${days} days to pay off your balance.`;
  }

  // Output in months if between 1 and 12 months
  if (months > 1 && months < 12) {
    return `It will take you ${Math.ceil(
      months
    )} months to pay off your balance.`;
  }

  // Fallback error
  return "An unexpected error occurred. Please try again.";
}
