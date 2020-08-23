export const calculateTotalCashAmount = (cashList) => {
  let totalCashAmount = 0;

  cashList.map(cash => {
    if (totalCashAmount < 0) {
      return 0;
    }
    else if (cash.transactionType === 'deposit') {
      totalCashAmount += cash.amount;
    }
    else if (cash.transactionType === 'withdraw') {
      totalCashAmount -= cash.amount;
    }
  });

  return Number(totalCashAmount.toFixed(2));
}