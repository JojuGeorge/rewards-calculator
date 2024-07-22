
export const ConfigureDataset = (dataSet) => {
  let data = dataSet;
  data = getLatestTransactionsSortedByCustomerId(data, 3);
  return data;
};

// Function to retrieve the latest `n` transactions per customerId sorted by customerId
function getLatestTransactionsSortedByCustomerId(transactions, n) {
  // Group transactions by customerId
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const key = transaction.customerId;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(transaction);
    return groups;
  }, {});

  // Get an array of customerIds
  const customerIds = Object.keys(groupedTransactions);

  // Sort customerIds
  customerIds.sort((a, b) => a - b); // Sorting customerIds numerically

  // Initialize array to store latest transactions
  let latestTransactions = [];

  // Process each customerId
  customerIds.forEach((customerId) => {
    // Sort transactions for the current customerId by transactionDate in descending order
    const sortedTransactions = groupedTransactions[customerId].sort(
      (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
    );

    // Select the latest `n` transactions from the sorted array
    const latestForCustomer = sortedTransactions.slice(0, n);

    // Push selected transactions to the result array
    latestTransactions = latestTransactions.concat(latestForCustomer);
  });

  return latestTransactions;
}


