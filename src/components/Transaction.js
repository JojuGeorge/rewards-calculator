import React from "react";

function Transaction({ customerId, computedData }) {
  return (
    <div>
      <div>
        <h4
          style={{ textAlign: "left" }}
        >{`${customerId}. ${computedData[customerId].customerName}`}</h4>
        <table>
          <thead>
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
        <hr />
      </div>
    </div>
  );
}

export default Transaction;
