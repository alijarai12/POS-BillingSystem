// import React, { useState } from "react";
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const LineGraph = ({ data, lineConfigs }) => {
//   const [selectedYear, setSelectedYear] = useState(null);

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   // Filter data based on the selected year
//   const filteredData = selectedYear ? data.filter(entry => entry.year === parseInt(selectedYear)) : data;

//   return (
//     <div>
//       <div>
//         <label>Select Year: </label>
//         <select value={selectedYear || ""} onChange={handleYearChange}>
//           <option value="">All</option>
//           {/* Assuming the years are available in your data */}
//           {Array.from(new Set(data.map(entry => entry.year))).map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <ResponsiveContainer width={"100%"} height={400}>
//         <LineChart
//           data={filteredData}
//           margin={{ top: 16, right: 10, left: -10, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tickLine={true}
//             fontSize={"0.7rem"}
//           />
//           <YAxis
//             fontSize={"0.7rem"}
//             axisLine={false}
//             tickLine={true}
//           />
//           <Tooltip contentStyle={{ backgroundColor: "#F4F6F6 " }} />
//           <Legend fontSize={"0.8rem"} />
//           {lineConfigs.map(({ dataKey, strokeColor, title }) => (
//             <Line
//               type="monotone"
//               dataKey={dataKey}
//               stroke={strokeColor}
//               key={dataKey}
//               strokeWidth={3}
//               name={title}
//             />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineGraph;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const LineGraph = () => {
//   const [data, setData] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSalesData();
//   }, []);

//   const fetchSalesData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/bills");
//       setData(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch sales data");
//       console.error("Error fetching sales data:", error);
//       setLoading(false);
//     }
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   // Filter data based on the selected year
//   const filteredData = selectedYear
//     ? data.filter(
//         (entry) => new Date(entry.date).getFullYear() === parseInt(selectedYear)
//       )
//     : data;

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <div>
//         <label>Select Year: </label>
//         <select value={selectedYear || ""} onChange={handleYearChange}>
//           <option value="">All</option>
//           {/* Assuming the years are available in your data */}
//           {Array.from(
//             new Set(data.map((entry) => new Date(entry.date).getFullYear()))
//           ).map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ResponsiveContainer width={"100%"} height={400}>
//         <LineChart
//           data={filteredData}
//           margin={{ top: 16, right: 10, left: -10, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="date"
//             axisLine={false}
//             tickLine={true}
//             fontSize={"0.7rem"}
//             tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
//           />
//           <YAxis fontSize={"0.7rem"} axisLine={false} tickLine={true} />
//           <Tooltip contentStyle={{ backgroundColor: "#F4F6F6 " }} />
//           <Legend fontSize={"0.8rem"} />
//           {/* Assuming your data structure has a key like 'totalAmount' for the line */}
//           <Line
//             type="monotone"
//             dataKey="totalAmount"
//             stroke="#8884d8"
//             strokeWidth={3}
//             // name="Total Amount"
//             name="Sales"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineGraph;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { Select, SelectItem } from "@nextui-org/react";

// const LineGraph = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedYear, setSelectedYear] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/bills");
//       setSalesData(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch data");
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(
//       event.target.value === "" ? null : parseInt(event.target.value)
//     );
//   };

//   // Filter data based on the selected year
//   const filteredSalesData = selectedYear
//     ? salesData.filter(
//         (transaction) =>
//           new Date(transaction.date).getFullYear() === selectedYear
//       )
//     : salesData;

//   // Function to format date to display month and year
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.toLocaleString("default", {
//       month: "short",
//     })} ${date.getFullYear()}`;
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <div>
//         <label>Select Year: </label>

//         <Select
//           id="categoryFilter"
//           name="category"
//           value={selectedYear || ""}
//           onChange={handleYearChange}
//           placeholder="Select Year"
//           size="sm"
//           className="rounded-lg w-[200px] hover"
//         >
//           {[
//             ...new Set(
//               salesData.map((transaction) =>
//                 new Date(transaction.date).getFullYear()
//               )
//             ),
//           ].map((year) => (
//             <SelectItem key={year} value={year}>
//               {year}
//             </SelectItem>
//           ))}
//         </Select>
//         {/* <Select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//           placeholder="Select Year"
//           size="md"
//           className="rounded-lg w-[150px]"
//         >
//           {uniqueYears.map((year) => (
//             <SelectItem key={year} value={year}>
//               {year}
//             </SelectItem>
//           ))}
//         </Select> */}
//       </div>
//       <ResponsiveContainer width={"100%"} height={400}>
//         <LineChart margin={{ top: 16, right: 30, left: 0, bottom: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="date"
//             axisLine={false}
//             tickLine={true}
//             tickFormatter={(tick) => formatDate(tick)}
//           />
//           <YAxis />
//           <Tooltip contentStyle={{ backgroundColor: "#F4F6F6" }} />
//           <Legend />
//           {/* Line for Sales */}
//           <Line
//             type="monotone"
//             data={filteredSalesData}
//             dataKey="totalAmount" // Assuming your sales data has a 'totalAmount' field
//             stroke="#8884d8"
//             strokeWidth={2}
//             name="Sales"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineGraph;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Select, SelectItem } from "@nextui-org/react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineGraph = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [selectedYear, selectedMonth, salesData]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bills");
      setSalesData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = salesData;
    if (selectedYear) {
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date).getFullYear().toString() === selectedYear
      );
    }
    if (selectedMonth) {
      filtered = filtered.filter(
        (transaction) =>
          monthNames[new Date(transaction.date).getMonth()] === selectedMonth
      );
    }
    setFilteredTransactions(filtered);
  };

  const uniqueYears = [
    ...new Set(
      salesData.map((transaction) =>
        new Date(transaction.date).getFullYear().toString()
      )
    ),
  ];

  const uniqueMonths = [
    ...new Set(
      salesData.map(
        (transaction) => monthNames[new Date(transaction.date).getMonth()]
      )
    ),
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
       <h1 className="text-3xl font-bold mb-4 text-violet-800">
        Sales Report
      </h1>
        <div className="flex space-x-4 mb-4">
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            placeholder="Select Year"
            size="sm"
            className="rounded-lg w-[150px]"
          >
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            placeholder="Select Month"
            size="sm"
            className="rounded-lg w-[150px]"
          >
            {uniqueMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </Select>
      </div>
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart
          data={filteredTransactions}
          margin={{ top: 16, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={true}
            tickFormatter={(tick) => formatDate(tick)}
          />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "#F4F6F6" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#8884d8"
            strokeWidth={2}
            name="Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
