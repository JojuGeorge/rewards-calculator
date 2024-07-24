import React from "react";

export const MonthlyTransactionRow = ({ month, monthData }) => {
    return (
      <tr>
        <td>{month}</td>
        <td>${monthData.monthlyAmount}</td>
        <td>{monthData.monthlyReward}</td>
      </tr>
    );
  };
  