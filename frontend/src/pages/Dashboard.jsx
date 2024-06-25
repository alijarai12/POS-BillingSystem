import React from "react";
import LineGraph from "../components/Linegraph";
import { data } from "../components/inputfields";
import { Card } from "@nextui-org/react";

const Dashboard = () => {
  const lineConfigs = [
    { dataKey: "sales", strokeColor: "#8884d8", title: "Sales" },
    { dataKey: "expenses", strokeColor: "#82ca9d", title: "Expenses" },
    { dataKey: "revenue", strokeColor: "#ff7300", title: "Revenue" },
  ];

  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Card>
        <div className="p-4 w-full">
          <LineGraph data={data} lineConfigs={lineConfigs} />
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
