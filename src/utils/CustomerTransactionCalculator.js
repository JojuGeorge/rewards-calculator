import { CustomerRewardCalculator } from "./CustomerRewardCalculator";
import { ConfigureDataset } from "./configureDataset/ConfigureDataset";
import { logger } from "../logger";

// Calculates the Reward points and total purchase amount of the customer transaction dataset
export const CustomerTransactionCalculator = (transactionDataSet) => {
  let updatedDataset = [];
  if (transactionDataSet) {
    updatedDataset = ConfigureDataset(transactionDataSet);
    logger.log(
      "Configured and sorted dataset of N month period: ",
      updatedDataset
    );
  }

  // Returns an Object of computed customer transaction dataset
  const transactionData =
    updatedDataset &&
    updatedDataset.reduce((res, data) => {
      const { customerId, customerName, transactionDate, amount } = data;

      const month = new Date(transactionDate).toLocaleString("default", {
        month: "long",
      });
      let year = new Date(transactionDate).getFullYear();
      // Calculate the Reward points based on the amount of purchase
      const rewardPoints = CustomerRewardCalculator(amount);

      if (!res[customerId])
        res[customerId] = {
          customerName: "",
          yearlyTransaction: {},
          totalTransaction: 0,
          totalRewards: 0,
        };

      // To prevent the automatic sort of numeric keys of Object in Javascript
      year = year + " ";
      if (!res[customerId].yearlyTransaction[year])
        res[customerId].yearlyTransaction[year] = {
          totalRewardsPerYear: 0,
          totalPurchasePerYear: 0,
          monthlyTransaction: {},
        };

      if (!res[customerId].yearlyTransaction[year].monthlyTransaction[month])
        res[customerId].yearlyTransaction[year].monthlyTransaction[month] = {
          monthlyAmount: 0,
          monthlyReward: 0,
        };

      res[customerId].yearlyTransaction[year].monthlyTransaction[
        month
      ].monthlyAmount += amount;
      res[customerId].yearlyTransaction[year].monthlyTransaction[
        month
      ].monthlyReward += rewardPoints;
      res[customerId].customerName = customerName;
      res[customerId].yearlyTransaction[year].totalPurchasePerYear +=
        Math.round(amount);
      res[customerId].yearlyTransaction[year].totalRewardsPerYear +=
        rewardPoints;

      return res;
    }, {});

  return transactionData;
};
