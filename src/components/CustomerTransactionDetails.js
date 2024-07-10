import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import GetTransactionDataset from "../service/TransactionDatasetApi";
import { CustomerTransactionCalculator } from "../utils/CustomerTransactionCalculator";
import { Container, Row } from "react-bootstrap";
import "./styles/css/CustomerTransactionDetails.css"

// Wrapper component
function CustomerTransactionDetails() {
  const [transactionDataSet, setTransactionDataSet] = useState([]);
  const [computedData, setComputedData] = useState({});

  useEffect(() => {
    const getDataSet = async () => {
      try {
        const dataSet = await GetTransactionDataset();
        setTransactionDataSet(dataSet);
      } catch (error) {
        console.log(error);
      }
    };
    getDataSet();
  }, []);

  useEffect(() => {
    if (transactionDataSet.length > 0) {
      const compData = CustomerTransactionCalculator(transactionDataSet);
      setComputedData(compData);
    }
  }, [transactionDataSet]);

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
