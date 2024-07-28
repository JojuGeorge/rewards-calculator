import { Config } from "../Config";

// function will return consecutive transaction over N month period
export const getLatestTransactionOfNMonth = (groupedData) => {
  let latestTransactionOfNMonthPeriod = [];

  Object.keys(groupedData).map((custid) => {
    let latestDate = groupedData[custid][0].transactionDate;
    groupedData[custid].forEach((transaction) => {
      // if transaction is not in same year then check if the transaction is within N month period if so push it to array
      if (
        new Date(latestDate).getFullYear() !==
        new Date(transaction.transactionDate).getFullYear()
      ) {
        let monthDiff = 12 - new Date(transaction.transactionDate).getMonth();
        if (monthDiff <= Config.TRANSACTION_RECORD_LENGTH) {
          latestTransactionOfNMonthPeriod.push(transaction);
        }
      } else {
        // else if transaction in same year then check if transaction is within N month period if so push it to array
        if (
          new Date(latestDate).getMonth() -
            new Date(transaction.transactionDate).getMonth() <=
          Config.TRANSACTION_RECORD_LENGTH
        ) {
          latestTransactionOfNMonthPeriod.push(transaction);
        }
      }
    });
  });

  return latestTransactionOfNMonthPeriod;
};
