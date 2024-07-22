import React, { useState, useEffect } from "react";
import Transaction from "./transaction/Transaction";
import GetTransactionDataset from "../service/TransactionDatasetApi";
import { CustomerTransactionCalculator } from "../utils/CustomerTransactionCalculator";
import "../styles/css/CustomerTransactionDetails.css";
import { logger } from "../logger";
import { calculateTotalRewards } from "../utils/configureDataset/CalculateTotalRewards";

// Wrapper component
function CustomerTransactionDetails() {
  const [transactionDataSet, setTransactionDataSet] = useState([]);
  const [computedData, setComputedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the Customer transaction dataset from API endpoint
    const getDataSet = async () => {
      try {
        setIsLoading(true);
        const dataSet = await GetTransactionDataset();
        logger.log("Set Fetched customer transaction dataset", dataSet);
        setTransactionDataSet(dataSet);
      } catch (error) {
        setError(error);
        logger.error(error);
      }
    };
    getDataSet();
  }, []);

  useEffect(() => {
    // Check if the Customer transaction dataset was successfully fetched
    if (transactionDataSet && transactionDataSet.length > 0) {
      setIsLoading(false);
      // Calculate the reward points of the fetched customer transaction dataset
      let compData = CustomerTransactionCalculator(transactionDataSet);
      Object.keys(compData).map((custId) =>
        logger.log("Computed Trasaction details of", computedData[custId])
      );
      logger.log(
        "Dataset of transaction after calculating reward points",
        compData
      );
      compData = calculateTotalRewards(compData);
      setComputedData(compData);
    }
  }, [transactionDataSet]);

  if (error) return <p className="errorMessage">{error.message}</p>;

  return (
    <div className="cust-transaction-details-container">
      {isLoading ? (
        <h4 className="loading">Loading...</h4>
      ) : (
        <>
          <h3 className="heading">Customer Transaction Details</h3>
          <div className="cust-transaction-details-wrapper">
            {Object.keys(computedData).map((customerId) => (
              // Iterate through each computed customer transaction dataset and render it
              <Transaction
                key={customerId}
                customerId={customerId}
                data={computedData}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerTransactionDetails;
