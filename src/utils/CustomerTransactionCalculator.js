import {CustomerRewardCalculator} from "./CustomerRewardCalculator";

// Calculates the Reward points and total purchase amount of the customer transaction dataset
export const  CustomerTransactionCalculator = (transactionDataSet)=> {

    // Returns an Object of computed customer transaction dataset
    const transactionData = transactionDataSet && transactionDataSet.reduce((res,transactionData) => {
        const {customerId, customerName, transactionId, transactionDate, amount } = transactionData;
        
        const month = new Date(transactionDate).toLocaleString('default', {month:'long'});
        // Calculate the Reward points based on the amount of purchase
        const rewardPoints = CustomerRewardCalculator(amount);

        if(!res[customerId])
            res[customerId] = {customerName:'', monthlyTransaction:{}, totalRewards:0, totalPurchase:0}

        if(!res[customerId].monthlyTransaction[month])
            res[customerId].monthlyTransaction[month] = {monthlyAmount:0, monthlyReward:0}

            res[customerId].monthlyTransaction[month].monthlyAmount += amount;
            res[customerId].monthlyTransaction[month].monthlyReward += rewardPoints;
            res[customerId].customerName = customerName;
            res[customerId].totalPurchase += amount;
            res[customerId].totalRewards += rewardPoints;

            return res;
    },{})

    return transactionData;
}

