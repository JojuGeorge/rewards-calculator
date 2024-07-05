import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import GetTransactionDataset from "../service/TransactionDatasetApi";
import {CustomerTransactionCalculator} from "../utils/CustomerTransactionCalculator";

// Wrapper component
function CustomerTransactionDetails() {

  const [transactionDataSet, setTransactionDataSet] = useState([]);
  const [computedData, setComputedData] = useState({});

  useEffect(()=>{
    let dataSet;
    const getDataSet = async ()=>{
      try{
        dataSet = await GetTransactionDataset();
        setTransactionDataSet(dataSet)
      }catch(error){
        console.log(error)
      }
    }
    getDataSet();

  },[])

  useEffect(()=>{
    let compData = CustomerTransactionCalculator(transactionDataSet);
    setComputedData(compData)
  }, [transactionDataSet])

  return (
    <div>
      data...
      {/* {computedData && console.log(computedData)} */}
     {
     Object.keys(computedData).map((item, i)=>{
      <Transaction item={item}/>
      })
     }
    </div>
  );
}

export default CustomerTransactionDetails;
