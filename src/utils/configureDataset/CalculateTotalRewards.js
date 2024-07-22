export const calculateTotalRewards = (dataSet) => {
    Object.keys(dataSet).map((customerId) =>
      Object.keys(dataSet[customerId].yearlyTransaction).map(
        (year) =>
          (dataSet[customerId].totalRewards +=
            dataSet[customerId].yearlyTransaction[year].totalRewardsPerYear)
      )
    );
  
    return dataSet;
  };