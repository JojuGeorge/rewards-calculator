export const CalculateTotalRewardsAndPurchase = (dataSet) => {
  Object.keys(dataSet).map((customerId) =>
    Object.keys(dataSet[customerId].yearlyTransaction).map((year) => {
      dataSet[customerId].totalRewards +=
        dataSet[customerId].yearlyTransaction[year].totalRewardsPerYear;
      dataSet[customerId].totalTransaction +=
        dataSet[customerId].yearlyTransaction[year].totalPurchasePerYear;
    })
  );

  return dataSet;
};
