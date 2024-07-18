import React from "react";

function Transaction({ customerId, data }) {
  const { customerName } = data;
  // console.log(yearlyTransaction);

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Monthly Amount</th>
            <th>Monthly Rewards</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data[customerId].yearlyTransaction).map((year) => {
            console.log(year);
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

                <tr>
                  <th>Total</th>
                  <td></td>
                  <td>
                    {data[customerId].yearlyTransaction[year].totalPurchase}
                  </td>
                  <td>
                    {data[customerId].yearlyTransaction[year].totalRewards}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const TransactionRow = ({ customerName, year, yearData }) => {
  return (
    <tr>
      <td rowSpan={Object.keys(yearData.monthlyTransaction).length + 1}>
        {year}
      </td>
      <td></td> {/* Placeholder for month in the yearly row */}
      <td></td> {/* Placeholder for monthly amount in the yearly row */}
      <td></td> {/* Placeholder for monthly rewards in the yearly row */}
    </tr>
  );
};

const MonthlyTransactionRow = ({ month, monthData }) => {
  return (
    <tr>
      <td>{month}</td>
      <td>{monthData.monthlyAmount.toFixed(2)}</td>
      <td>{monthData.monthlyReward}</td>
    </tr>
  );
};

export default Transaction;
