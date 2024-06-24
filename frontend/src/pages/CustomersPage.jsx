import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CustomerDetailModal from "./CustomerDetailModal"; // Import the modal component

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: searchTerm,
        },
      });

      setCustomers(response.data);
    } catch (error) {
      setError("Error fetching customers. Please try again later.");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCustomersPerPageChange = (e) => {
    setCustomersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(customers.length / customersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Customer List</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
          aria-label="Search customers"
        />
        <select
          className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={customersPerPage}
          onChange={handleCustomersPerPageChange}
          aria-label="Customers per page"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
        </select>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading customers...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">Error: {error}</p>
      ) : currentCustomers.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <>
          <ul className="list-disc pl-4">
            {currentCustomers.map((customer, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500"
                onClick={() => setSelectedCustomer(customer)}
              >
                {customer.name}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-2 mx-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <CustomerDetailModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
};

export default CustomersPage;
