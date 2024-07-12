import React from "react";
import {Table, Card} from 'react-bootstrap'
import "../styles/css/Transaction.css"

function Transaction({ customerId, computedData }) {
  return (
    <div> 
      <Card className="card" label={`${customerId}. ${computedData[customerId].customerName}`}>
        {/* <h4 label="Customer" className="table-name">{`${customerId}. ${computedData[customerId].customerName}`}</h4> */}
        <table className="table table-striped sm-2">
          <thead className="table-head table-dark">
            <tr>
              <th>Month</th>
              <th>Amount Spent</th>
              <th>Points Earned</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(computedData[customerId].monthlyTransaction).map(
              (month) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>
                    {
                      computedData[customerId].monthlyTransaction[month]
                        .monthlyAmount
                    }
                  </td>
                  <td>
                    {
                      computedData[customerId].monthlyTransaction[month]
                        .monthlyReward
                    }
                  </td>
                </tr>
              )
            )}
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td>{computedData[customerId].totalPurchase}</td>
              <td>{computedData[customerId].totalRewards}</td>
            </tr>
          </tbody>
        </table>

        <div className="total-reward-points"> <b>Total Reward Points : </b> {computedData[customerId].totalRewards}</div>
      </Card>
    </div>
  );
}

export default Transaction;
