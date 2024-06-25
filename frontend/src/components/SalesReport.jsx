import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Card,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SalesTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [selectedYear, selectedMonth, transactions]);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bills");
      setTransactions(response.data);
      setFilteredTransactions(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch transactions");
      console.error("There was an error fetching the transactions!", error);
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;
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
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Calculate the total value sum
  const totalAmountSum = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.totalAmount,
    0
  );

  const uniqueYears = [
    ...new Set(
      transactions.map((transaction) =>
        new Date(transaction.date).getFullYear().toString()
      )
    ),
  ];

  const uniqueMonths = [
    ...new Set(
      transactions.map(
        (transaction) => monthNames[new Date(transaction.date).getMonth()]
      )
    ),
  ];

  // Calculate the items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-violet-800">
        Sales Transactions
      </h1>
      <div className="flex space-x-4 mb-4">
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
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
          onChange={(e) => setSelectedMonth(e.target.value)}
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
      <Card className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableColumn className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider">
              Date
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Customer Name
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Customer Number
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Address
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Payment Mode
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Total Amount
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Payment Status
            </TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="px-6 py-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.customerName}</TableCell>
                <TableCell>{transaction.customerNumber}</TableCell>
                <TableCell>{transaction.address}</TableCell>
                <TableCell>{transaction.paymentMode}</TableCell>
                <TableCell>${transaction.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{transaction.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold text-black">
          Total: ${totalAmountSum.toFixed(2)}
        </h1>
        <Pagination
          total={Math.ceil(filteredTransactions.length / itemsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SalesTransaction;
