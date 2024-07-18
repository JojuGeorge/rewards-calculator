import {CustomerRewardCalculator} from "./CustomerRewardCalculator";
import { ConfigureDataset } from "./ConfigureDataset";

// Calculates the Reward points and total purchase amount of the customer transaction dataset
export const  CustomerTransactionCalculator = (transactionDataSet)=> {

    // TODO properly sort, and cut the array
    if(transactionDataSet){
        const updatedDataset = ConfigureDataset(transactionDataSet);
        console.log('=======================================================')
        console.log(updatedDataset)
    }

    // Returns an Object of computed customer transaction dataset
    const transactionData = transactionDataSet && transactionDataSet.reduce((res,transactionData) => {
        const {customerId, customerName, transactionId, transactionDate, amount } = transactionData;
        
        const month = new Date(transactionDate).toLocaleString('default', {month:'long'});
        const year = new Date(transactionDate).getFullYear();
        // Calculate the Reward points based on the amount of purchase
        const rewardPoints = CustomerRewardCalculator(amount);

        if(!res[customerId])
            res[customerId] = {customerName:'', yearlyTransaction:{}, totalRewards:0, totalPurchase:0}

        if(!res[customerId].yearlyTransaction[year])
            res[customerId].yearlyTransaction[year] = {monthlyTransaction:{}};

        if(!res[customerId].yearlyTransaction[year].monthlyTransaction[month])
            res[customerId].yearlyTransaction[year].monthlyTransaction[month] = {monthlyAmount:0, monthlyReward:0}

            res[customerId].yearlyTransaction[year].monthlyTransaction[month].monthlyAmount += amount;
            res[customerId].yearlyTransaction[year].monthlyTransaction[month].monthlyReward += rewardPoints;
            res[customerId].customerName = customerName;
            res[customerId].totalPurchase += amount;
            res[customerId].totalRewards += rewardPoints;

            return res;
    },{})

    return transactionData;
}

