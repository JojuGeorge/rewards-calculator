import React from "react";
import CustomerTransactionDetails from "../components/CustomerTransactionDetails";
import "../styles/css/Dashboard.css"


// Parent component
function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <CustomerTransactionDetails />
    </div>
  );
}

export default Dashboard;
