export const calculateTotalCashAmount = (cashList) => {
  let totalCashAmount = 0;

  cashList.map(cash => {
    if (cash.transactionType === 'deposit') {
      totalCashAmount += cash.amount;
    }
    else if (cash.transactionType === 'withdraw') {
      totalCashAmount -= cash.amount;
    }
  });

  if (totalCashAmount < 0) return 0;
  return Number(totalCashAmount.toFixed(2));
}