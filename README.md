## Assignment

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

  

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 

 

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.



// Temp Notes - Initial Idea
* main logic inside customerTransactionDetails.js comp
* Api call initiated from customerTransactionDetails.js comp
    * returns data of transaction after calculating total purchase and reward points
* Transaction.js comp is used inside customerTransactionDetails.js to show each transaction details

FLOW >>>
customerTransactionDetails.js > 
    api call > 
        returns data to customerTransactionDetails 
        
    customerTransactionCalculator.js > 
        customerRewardCalculator.js
            return calculated rewards
        returns calculated transaction and reward

    Transaction.js
        * to show details of each customer transaction

* customerRewardCalculator.js util comp is invoked from customerTransactionCalculator.js  

* customerTransactionCalculator.js
    * Takes transaction data and calls the customerRewardCalculator.js util comp which returns an array of cust details with calculated rewards
    * Calculates the purchase amount and returns the complete new array

* cusotmerRewardCalculator.js util comp
    * Takes cust data traverse it and calculates rewards and adds it and returns an array.
        * If customer is already present then adds the reward points to existing cust in arry - dont create new obj in array
        [{custId, reward},...]

* Add Error handling for failed API call
* Generic Error handler
* Test cases