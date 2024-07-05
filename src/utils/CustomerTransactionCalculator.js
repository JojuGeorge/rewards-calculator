import {CustomerRewardCalculator} from "./CustomerRewardCalculator";

export const  CustomerTransactionCalculator = (transactionDataSet)=> {


    const transactionData = transactionDataSet && transactionDataSet.reduce((res,transactionData) => {
        const {customerId, customerName, transactionId, transactionDate, amount } = transactionData;
        
        const month = new Date(transactionDate).toLocaleString('default', {month:'long'});
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

