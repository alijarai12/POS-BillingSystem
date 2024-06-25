import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Card,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@nextui-org/react";
import AddExpenses from "./AddExpenses";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [categories, setCategories] = useState([]);
  const [Recurrences, setRecurrences] = useState([]);
  const [years, setYears] = useState([]);

  const [dates, setDate] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    Recurrence: "",
    year: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    extractCategoriesAndDates(expenses);
  }, [expenses]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to first page after filtering
  };

  const extractCategoriesAndDates = (expenses) => {
    const categories = [
      ...new Set(expenses.map((expense) => expense.category)),
    ];
    const dates = [...new Set(expenses.map((expense) => expense.date))];
    const Recurrences = [
      ...new Set(expenses.map((expense) => expense.Recurrence)),
    ];
    const years = [
      ...new Set(
        expenses.map((expense) =>
          new Date(expense.date).getFullYear().toString()
        )
      ),
    ];
    setCategories(categories);
    setDate(dates);
    setRecurrences(Recurrences);
    setYears(years);
  };

  const sortedExpenses = useMemo(() => {
    let sortableExpenses = [...expenses];
    if (sortConfig.key !== null) {
      sortableExpenses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableExpenses;
  }, [expenses, sortConfig]);

  const filteredExpenses = useMemo(() => {
    return sortedExpenses.filter((expense) => {
      const expenseYear = new Date(expense.date).getFullYear();

      return (
        (filters.category === "" || expense.category === filters.category) &&
        (filters.date === "" || expense.date === filters.date) &&
        (filters.Recurrence === "" ||
          expense.Recurrence === filters.Recurrence) &&
        (filters.year === "" || expenseYear.toString() === filters.year)
      );
    });
  }, [sortedExpenses, filters]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const totalAmountSum = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, endIndex);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-between mt-3">
          {" "}
          <h1 className="text-3xl font-bold mb-6 text-center text-violet-800">
            Expenses Transactions
          </h1>{" "}
          <AddExpenses />
        </div>

        <div className="flex gap-2 mb-3">
          <Select
            id="categoryFilter"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="Select a Category"
            size="sm"
            className="rounded-lg w-[150px]"
          >
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          <Select
            id="dateFilter"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            placeholder="Select a Date"
            size="sm"
            className="rounded-lg w-[150px]"
          >
            {dates.map((date) => (
              <SelectItem key={date} value={date}>
                {date}
              </SelectItem>
            ))}
          </Select>
          <Select
            id="Recurrencefilter"
            name="Recurrence"
            value={filters.Recurrence}
            onChange={handleFilterChange}
            placeholder="Select a Recurrence"
            size="sm"
            className="rounded-lg w-[150px]"
          >
            {Recurrences.map((Recurrence) => (
              <SelectItem key={Recurrence} value={Recurrence}>
                {Recurrence}
              </SelectItem>
            ))}
          </Select>
          <Select
            id="yearFilter"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            placeholder="Select a Year"
            size="sm"
            className="rounded-lg w-[150px]"
          >
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Card className="overflow-x-auto">
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableColumn
                onClick={() => requestSort("date")}
                className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider"
              >
                Date
              </TableColumn>
              <TableColumn
                onClick={() => requestSort("recurrence")}
                className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider"
              >
                Recurrence
              </TableColumn>
              <TableColumn
                onClick={() => requestSort("amount")}
                className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider"
              >
                Amount
              </TableColumn>
              <TableColumn
                onClick={() => requestSort("currency")}
                className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider"
              >
                Currency
              </TableColumn>
              <TableColumn className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider">
                Description
              </TableColumn>
              <TableColumn
                onClick={() => requestSort("category")}
                className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider"
              >
                Category
              </TableColumn>
              <TableColumn
                onClick={() => requestSort("paymentMethod")}
                className="text-xs leading-4 font-semibold cursor-pointer text-gray-600 uppercase tracking-wider"
              >
                Payment Method
              </TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="px-6 py-4">{expense.date}</TableCell>
                  <TableCell>{expense.Recurrence}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.currency}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-black">
            Total Amount: ${totalAmountSum.toFixed(2)}
          </span>
          <Pagination
            total={Math.ceil(filteredExpenses.length / itemsPerPage)}
            initialPage={1}
            currentPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default Expenses;
