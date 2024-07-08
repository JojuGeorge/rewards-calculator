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
    const compData = CustomerTransactionCalculator(transactionDataSet);
    setComputedData(compData)
  }, [transactionDataSet])


  return (
    <div>

      {JSON.stringify(computedData)}

     {
     computedData && Object.keys(computedData).map((customerId)=>{
      <Transaction tst="hi there" tst1={"lskdjf"}/>
      })
     }

     
    </div>
  );
}

export default CustomerTransactionDetails;
