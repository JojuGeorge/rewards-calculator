import React from "react";

export const TransactionRow = ({ year, yearData }) => {
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
