import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import GetTransactionDataset from "../service/TransactionDatasetApi";
import { CustomerTransactionCalculator } from "../utils/CustomerTransactionCalculator";
import { Container, Row } from "react-bootstrap";
import "./styles/css/CustomerTransactionDetails.css"
import { logger } from "../logger";

// Wrapper component
function CustomerTransactionDetails() {
  const [transactionDataSet, setTransactionDataSet] = useState([]);
  const [computedData, setComputedData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
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
    if (transactionDataSet && transactionDataSet.length > 0) {
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
