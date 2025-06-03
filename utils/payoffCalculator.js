// Calculates the time to pay off a balance based on balance, monthly payment, interest rate, and optional monthly fee.
export function calculatePayoff(
  amountInputted,
  interestInputted,
  paymentAmount,
  monthlyFee = 0,
  paymentFrequency = "monthly",
  interestFrequency = "monthly"
) {
  // Input validation
  if (isNaN(amountInputted) || amountInputted <= 0) {
    return "Please enter a valid amount greater than 0.";
  }
  if (isNaN(monthlyFee) || monthlyFee < 0) {
    return "Please enter a valid monthly fee greater than or equal to 0.";
  }
  if (paymentAmount <= 0) {
    return "Monthly payment must be greater than 0.";
  }
  if (interestInputted === "" || isNaN(interestInputted)) {
    interestInputted = 0; // Default to 0 if not provided
  }
  if (interestInputted < 0) {
    return "Interest rates that are negative indicate you are being paid to borrow money, which is not realistic. Please check your inputs.";
  }

  // Calculate effective payment after monthly fee
  let effectivePayment;
  if (paymentFrequency === "daily") {
    effectivePayment = paymentAmount - monthlyFee / 30; // Assuming 30 days in a month
  } else {
    effectivePayment = paymentAmount - monthlyFee;
  }
  if (effectivePayment <= 0) {
    return "Monthly payment must be greater than the monthly fee.";
  }

  // Immediate payoff check
  if (paymentAmount >= amountInputted) {
    return "You can pay off your balance immediately.";
  }

  // Calculate periods to payoff
  let periods;
  if (!interestInputted || interestInputted === 0) {
    periods = amountInputted / effectivePayment;
  } else {
    let r;
    if (interestFrequency === "daily") {
      r = interestInputted / 100 / 365; // Daily interest rate
    } else {
      r = interestInputted / 100 / 12; // convert monthly rate to monthly decimal
      if (paymentFrequency === "daily") {
        // convert monthly rate to daily
        r = Math.pow(1 + r, 1 / 30) - 1;
      }
    }
    periods =
      Math.log(effectivePayment / (effectivePayment - r * amountInputted)) /
      Math.log(1 + r);
  }

  // Handle invalid or unrealistic input
  if (isNaN(periods)) {
    return "Data provided is unrealistic. Please check your inputs.";
  }

  // Output formatting
  if (paymentFrequency === "monthly") {
    if (periods >= 12) {
      const years = Math.floor(periods / 12);
      if (years >= 100) {
        return "Payoff time is 100 years or longer.";
      }
      return `It will take you ${years} year(s) to pay off your balance.`;
    }
    if (periods <= 1) {
      const days = Math.ceil(periods * 30);
      return `It will take you ${days} day(s) to pay off your balance.`;
    }
    if (periods > 1 && periods < 12) {
      return `It will take you ${Math.ceil(
        periods
      )} month(s) to pay off your balance.`;
    }
  } else if (paymentFrequency === "daily") {
    if (periods >= 365) {
      const years = Math.floor(periods / 365);
      if (years >= 100) {
        return "Payoff time is 100 years or longer.";
      }
      return `It will take you ${years} years to pay off your balance.`;
    }
    if (periods <= 1) {
      return `It will take you 1 day to pay off your balance.`;
    }
    if (periods > 1 && periods < 365) {
      return `It will take you ${Math.ceil(
        periods
      )} days to pay off your balance.`;
    }
  }

  // Fallback error
  return "An unexpected error occurred. Please try again.";
}
