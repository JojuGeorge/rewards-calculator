import { Config } from "../Config";
import { logger } from "../../logger";

export const ConfigureDataset = (dataSet) => {
  let data = dataSet;
  data = getLatestTransactionsSortedByCustomerId(
    data,
    Config.TRANSACTION_RECORD_LENGTH
  );
  return data;
};

// Function to retrieve the latest `n` transactions per customerId sorted by customerId
function getLatestTransactionsSortedByCustomerId(transactions, recordLength) {
  // Group transactions by customerId
  const groupedTransactions = (transactions) => {
    const groupedData = transactions.reduce((groups, transaction) => {
      const key = transaction.customerId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(transaction);
      return groups;
    }, {});
    return groupedData;
  };

  const groupedTransactionData = groupedTransactions(transactions);

  logger.log("Grouped data : ", groupedTransactionData);

  // Get an array of customerIds
  const customerIds = Object.keys(groupedTransactionData);

  // Sort customerIds
  customerIds.sort((a, b) => a - b); // Sorting customerIds numerically

  // Initialize array to store latest transactions
  let latestTransactions = [];

  // Process each customerId
  customerIds.forEach((customerId) => {
    // Sort transactions for the current customerId by transactionDate in descending order
    const sortedTransactions = groupedTransactionData[customerId].sort(
      (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
    );

    // Select the latest `n` transactions from the sorted array
    const latestForCustomer = sortedTransactions.slice(0, recordLength);

    // Push selected transactions to the result array
    latestTransactions = latestTransactions.concat(latestForCustomer);
  });

  // TEST--------------------
  const gd = groupedTransactions(latestTransactions);
  console.log("================", gd);

  // console.log("========", gd[0].transactionDate);
  let x = [];
  const data1 = (gd) => {
    Object.keys(gd).map((custid) => {
      let latestDate = gd[custid][0].transactionDate;
      gd[custid].forEach((transaction) => {
        let latestYear = new Date(latestDate).getFullYear();
        let otherYear = new Date(transaction.transactionDate).getFullYear();
      });
    });
  };
  data1(gd);

  // test end-----------------

  return latestTransactions;
}
