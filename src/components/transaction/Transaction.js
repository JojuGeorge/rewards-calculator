import React from "react";
import { TransactionRow } from "./TransactionRow";
import { MonthlyTransactionRow } from "./MonthlyTransactionRow";
import "../../styles/css/Transaction.css";

function Transaction({ customerId, data }) {
  const { customerName } = data;

  return (
    <div
      className="card"
      label={`${customerId}.${data[customerId].customerName}`}
    >
      <table className="  sm-2">
        <thead className="table-head">
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data[customerId].yearlyTransaction).map((year) => {
            return (
              <React.Fragment key={`${data.customerId}-${year}`}>
                <TransactionRow
                  customerName={customerName}
                  year={year}
                  yearData={data[customerId].yearlyTransaction[year]}
                />
                {Object.keys(
                  data[customerId].yearlyTransaction[year].monthlyTransaction
                ).map((month) => (
                  <MonthlyTransactionRow
                    key={`${data.customerId}-${year}-${month}`}
                    month={month}
                    monthData={
                      data[customerId].yearlyTransaction[year]
                        .monthlyTransaction[month]
                    }
                  />
                ))}
                <tr className="total-row">
                  <th>Total</th>
                  <td></td>
                  <td><b>${
                      data[customerId].yearlyTransaction[year]
                        .totalPurchasePerYear
                    }</b>
                  </td>
                  <td><b>{
                      data[customerId].yearlyTransaction[year]
                        .totalRewardsPerYear
                    }</b>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="total-reward-points">
        <b>Total Reward Points : {data[customerId].totalRewards} Points</b>
      </div>
    </div>
  );
}


export default Transaction;
