// App.js
import React from 'react';
import LineGraph from "../components/Linegraph";

const Overview = () => {
  // Sample sales data (replace with your actual data)
  const salesData = [
    { month: 'January', totalSales: 1000 },
    { month: 'February', totalSales: 1500 },
    { month: 'March', totalSales: 2000 },
    // Add more data for other months
  ];

  return (
    <div>
      <h1>Sales Report</h1>
      <LineGraph salesData={salesData} />
    </div>
  );
};

export default Overview;
