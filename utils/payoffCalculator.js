const DAYS_IN_YEAR = 365;
const DAYS_IN_MONTH = 30;
/**
 * Formats the payoff output string based on periods and payment frequency.
 * @param {number} periods - The number of periods (months or days) to payoff.
 * @param {"monthly"|"daily"} paymentFrequency - The frequency of payments.
 * @returns {string} - A human-readable payoff time message.
 */
function formatPayoffOutput(periods, paymentFrequency) {
  if (paymentFrequency === "monthly") {
    if (periods >= 12) {
      const years = Math.floor(periods / 12);
      if (years >= 100) {
        return "Payoff time is 100 years or longer.";
      }
      return `It will take you ${years} year(s) to pay off your balance.`;
    }
    if (periods <= 1) {
      const days = Math.ceil(periods * DAYS_IN_MONTH);
      return `It will take you ${days} day(s) to pay off your balance.`;
    }
    if (periods > 1 && periods < 12) {
      return `It will take you ${Math.ceil(
        periods
      )} month(s) to pay off your balance.`;
    }
  } else if (paymentFrequency === "daily") {
    if (periods >= DAYS_IN_YEAR) {
      const years = Math.floor(periods / DAYS_IN_YEAR);
      if (years >= 100) {
        return "Payoff time is 100 years or longer.";
      }
      return `It will take you ${years} years to pay off your balance.`;
    }
    if (periods <= 1) {
      return `It will take you 1 day to pay off your balance.`;
    }
    if (periods > 1 && periods < DAYS_IN_YEAR) {
      return `It will take you ${Math.ceil(
        periods
      )} days to pay off your balance.`;
    }
  }

  // Fallback error
  return "An unexpected error occurred. Please try again.";
}

/**
 * Calculates the time to pay off a balance based on balance, payment, interest rate, and optional monthly fee.
 * @param {number} amountInputted - The starting balance.
 * @param {number} interestInputted - The interest rate.
 * @param {"monthly"|"daily"} [interestFrequency="monthly"] - Interest compounding frequency.
 * @param {number} paymentAmount - The payment amount per period.
 * @param {number} [monthlyFee=0] - Optional monthly fee.
 * @returns {string} - A message describing the payoff time or an error.
 */
export function calculatePayoff(
  amountInputted,
  interestInputted,
  paymentAmount,
  monthlyFee = 0,
  paymentFrequency = "monthly",
  interestFrequency = "monthly"
) {
  // Calculate effective payment after monthly fee
  let effectivePayment;
  if (paymentFrequency === "daily") {
    effectivePayment = paymentAmount - monthlyFee / DAYS_IN_MONTH; // Assuming DAYS_IN_MONTH days in a month
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
      r = interestInputted / 100; // Daily interest rate
    } else {
      r = interestInputted / 100 / 12; // convert monthly rate to monthly decimal
      if (paymentFrequency === "daily") {
        // convert monthly rate to daily
        r = Math.pow(1 + r, 1 / DAYS_IN_MONTH) - 1;
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

  return formatPayoffOutput(periods, paymentFrequency);
}
