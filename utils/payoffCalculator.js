// Calculates the time to pay off a balance based on balance, monthly payment, interest rate, and optional monthly fee.
export function calculatePayoff(
  amountInputted,
  interestInputted,
  monthlyPayment,
  monthlyFee = 0
) {
  // Input validation
  if (isNaN(amountInputted) || amountInputted <= 0) {
    return "Please enter a valid amount greater than 0.";
  }
  if (isNaN(monthlyFee) || monthlyFee < 0) {
    return "Please enter a valid monthly fee greater than or equal to 0.";
  }
  if (monthlyPayment <= 0) {
    return "Monthly payment must be greater than 0.";
  }
  if (interestInputted === "" || isNaN(interestInputted)) {
    interestInputted = 0; // Default to 0 if not provided
  }
  if (interestInputted < 0) {
    return "Interest rates that are negative indicate you are being paid to borrow money, which is not realistic. Please check your inputs.";
  }

  // Calculate effective payment after monthly fee
  const effectivePayment = monthlyPayment - monthlyFee;
  if (effectivePayment <= 0) {
    return "Monthly payment must be greater than the monthly fee.";
  }

  // Immediate payoff check
  if (monthlyPayment >= amountInputted) {
    return "You can pay off your balance immediately.";
  }

  // Calculate months to payoff
  let months;
  if (!interestInputted || interestInputted === 0) {
    months = amountInputted / monthlyPayment;
  } else {
    const r = interestInputted / 100 / 12;
    months =
      Math.log(effectivePayment / (effectivePayment - r * amountInputted)) /
      Math.log(1 + r);
  }

  // Handle invalid or unrealistic input
  if (isNaN(months)) {
    return "Data provided is unrealistic. Please check your inputs.";
  }

  // Output formatting
  if (months >= 12) {
    const years = Math.floor(months / 12);
    if (years >= 100) {
      return "Payoff time is 100 years or longer.";
    }
    return `It will take you ${years} years to pay off your balance.`;
  }
  if (months <= 1) {
    const days = Math.ceil(months * 30);
    return `It will take you ${days} days to pay off your balance.`;
  }
  if (months > 1 && months < 12) {
    return `It will take you ${Math.ceil(
      months
    )} months to pay off your balance.`;
  }

  // Fallback error
  return "An unexpected error occurred. Please try again.";
}
