import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

// Wrapper component
function CustomerTransactionDetails() {
  return (
    <div>
      <Transaction />
    </div>
  );
}

export default CustomerTransactionDetails;
