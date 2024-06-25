import { Card } from "@nextui-org/react";
import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiSolidCategory } from "react-icons/bi";
import {
  FaBox,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaBarcode,
  FaDollarSign,
} from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import LineGraph from "../components/Linegraph";
// import { data } from "../components/inputfields";

function Home() {
  const data = [
    // Data for 2022
    { date: "2022-01-15", totalAmount: 1200, amount: 600 },
    { date: "2022-02-12", totalAmount: 1400, amount: 700 },
    { date: "2022-03-20", totalAmount: 1600, amount: 800 },
    { date: "2022-04-05", totalAmount: 1800, amount: 900 },
    { date: "2022-05-10", totalAmount: 2000, amount: 1000 },
    { date: "2022-06-18", totalAmount: 2200, amount: 1100 },
    { date: "2022-07-25", totalAmount: 2400, amount: 1200 },
    { date: "2022-08-30", totalAmount: 2600, amount: 1300 },
    { date: "2022-09-15", totalAmount: 2800, amount: 1400 },
    { date: "2022-10-22", totalAmount: 3000, amount: 1500 },
    { date: "2022-11-11", totalAmount: 3200, amount: 1600 },
    { date: "2022-12-05", totalAmount: 3400, amount: 1700 },

    // Data for 2023
    { date: "2023-01-15", totalAmount: 1500, amount: 750 },
    { date: "2023-02-12", totalAmount: 1700, amount: 850 },
    { date: "2023-03-20", totalAmount: 1900, amount: 950 },
    { date: "2023-04-05", totalAmount: 2100, amount: 1050 },
    { date: "2023-05-10", totalAmount: 2300, amount: 1150 },
    { date: "2023-06-18", totalAmount: 2500, amount: 1250 },
    { date: "2023-07-25", totalAmount: 2700, amount: 1350 },
    { date: "2023-08-30", totalAmount: 2900, amount: 1450 },
    { date: "2023-09-15", totalAmount: 3100, amount: 1550 },
    { date: "2023-10-22", totalAmount: 3300, amount: 1650 },
    { date: "2023-11-11", totalAmount: 3500, amount: 1750 },
    { date: "2023-12-05", totalAmount: 3700, amount: 1850 },

    // Data for 2024
    { date: "2024-01-15", totalAmount: 2000, amount: 1000 },
    { date: "2024-02-12", totalAmount: 2200, amount: 1100 },
    { date: "2024-03-20", totalAmount: 2400, amount: 1200 },
    { date: "2024-04-05", totalAmount: 2600, amount: 1300 },
    { date: "2024-05-10", totalAmount: 2800, amount: 1400 },
    { date: "2024-06-18", totalAmount: 3000, amount: 1500 },
    { date: "2024-07-25", totalAmount: 3200, amount: 1600 },
    { date: "2024-08-30", totalAmount: 3400, amount: 1700 },
    { date: "2024-09-15", totalAmount: 3600, amount: 1800 },
    { date: "2024-10-22", totalAmount: 3800, amount: 1900 },
    { date: "2024-11-11", totalAmount: 4000, amount: 2000 },
    { date: "2024-12-05", totalAmount: 4200, amount: 2100 },
  ];

  const lineConfigs = [
    {
      dataKey: "totalAmount",
      stroke: "#8884d8",
      strokeWidth: 2,
      name: "Sales",
    },
    { dataKey: "amount", stroke: "#82ca9d", strokeWidth: 2, name: "Expenses" },
  ];

  return (
    <main className="p-4 container mx-auto">
      <div className="main-title">
        <h3 className="font-bold text-3xl text-violet-800 font-roboto">
          Dashboard
        </h3>
      </div>

      <div className="main-cards">
        <Card className="p-5 shadow-xl border-2">
          <div className=" flex flex-row justify-between">
            <h3 className="mb-2 font-roboto font-semibold text-xl">
              Total Revenue
            </h3>
            <FcMoneyTransfer className="text-xl" />
          </div>
          <p className="opacity-75	"> Boost your earnings.</p>
          <h1 className="text-xl">$ 15000</h1>
        </Card>
        <Card className="p-5 shadow-xl border-2">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 font-roboto font-semibold text-xl">
              Categories
            </h3>
            <BiSolidCategory className="text-xl" />
          </div>
          <p className="opacity-75	"> Organized options.</p>
          <h1 className="text-xl">12</h1>
        </Card>
        <Card className="p-5 shadow-xl border-2">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 font-roboto font-semibold text-xl">
              Customers
            </h3>
            <FaUsers className="text-xl" />
          </div>
          <p className="opacity-75	">Your satisfaction, our priority</p>
          <h1 className="text-xl">12</h1>
        </Card>
        <Card className="p-5 shadow-xl border-2">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 font-roboto font-semibold text-xl">Alerts</h3>
            <BsFillBellFill className="text-xl" />
          </div>{" "}
          <p className="opacity-75	">Stay informed.</p>
          <h1 className="text-xl">42</h1>
        </Card>
        <Card className="p-5 shadow-xl border-2">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 font-roboto font-semibold text-xl">Sales</h3>
            <FaRegCreditCard className="text-xl" />
          </div>{" "}
          <p className="opacity-75">Unbeatable deals.</p>
          <h1 className="text-xl">$ 20000</h1>
        </Card>
      </div>

      <div className=" h-full">
        <ResponsiveContainer width="100%" height="100%">
          {/* <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart> */}
          <LineGraph data={data} lineConfigs={lineConfigs} />
        </ResponsiveContainer>
        
        {/* <ResponsiveContainer width="100%" height="100%">
          {/* <LineChart
            width={500}
            height={300}
            data={datas}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart> */}
        {/* </ResponsiveContainer> */}
      </div>
    </main>
  );
}

export default Home;
