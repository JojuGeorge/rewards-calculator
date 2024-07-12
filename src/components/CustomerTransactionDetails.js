import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import GetTransactionDataset from "../service/TransactionDatasetApi";
import { CustomerTransactionCalculator } from "../utils/CustomerTransactionCalculator";
import "../styles/css/CustomerTransactionDetails.css"
import { logger } from "../logger";

// Wrapper component
function CustomerTransactionDetails() {
  const [transactionDataSet, setTransactionDataSet] = useState([]);
  const [computedData, setComputedData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {

    // Get the Customer transaction dataset from API endpoint
    const getDataSet = async () => {
      try {
        const dataSet = await GetTransactionDataset();
        logger.log("Fetched customer transaction dataset",dataSet)
        setTransactionDataSet(dataSet);
      } catch (error) {
        setError(error)
        logger.error(error);
      }
    };
    getDataSet();
  }, []);

  useEffect(() => {
    // Check if the Customer transaction dataset was successfully fetched
    if (transactionDataSet && transactionDataSet.length > 0) {
      // Calculate the reward points of the fetched customer transaction dataset
      const compData = CustomerTransactionCalculator(transactionDataSet);
      Object.keys(compData).map(custId => logger.log("Computed Trasaction details of",computedData[custId]))
      logger.log("Dataset of transaction after calculating reward points",compData)
      setComputedData(compData);
    }
  }, [transactionDataSet]);


  if(error) 
    return <p>{error.message}</p>

  return (
    <div className="cust-transaction-details-container">
      <h3>Customer Transaction Details</h3>
      <div className="cust-transaction-details-wrapper"> 
        {Object.keys(computedData).map((customerId) => (
          // Iterate through each computed customer transaction dataset and render it
          <Transaction
            key={customerId}
            customerId={customerId}
            computedData={computedData}
          />
        ))}
      </div>
    </div>

  );
}

export default CustomerTransactionDetails;
