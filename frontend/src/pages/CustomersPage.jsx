import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5); // Default value

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
      } catch (error) {
        setError("Error fetching customers. Please try again later.");
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.number.toString().includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Customer List</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by name, number, or address"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
        />
        <select
          className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={customersPerPage}
          onChange={(e) => setCustomersPerPage(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
        </select>
      </div>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {currentCustomers.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow-lg overflow-hidden">
              {/* Table Header */}
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Customer Name</th>
                  <th className="px-6 py-3 text-left">Customer Number</th>
                  <th className="px-6 py-3 text-left">Address</th>
                  <th className="px-6 py-3 text-left">Order History</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {currentCustomers.map((customer, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul className="list-disc pl-4">
                        {customer.orders.map((order, orderIndex) => (
                          <li key={orderIndex}>
                            <div>
                              Date: {new Date(order.date).toLocaleDateString()}
                            </div>
                            <table className="border-collapse">
                              <tbody>
                                {order.cartItems.map((item, itemIndex) => (
                                  <tr key={itemIndex}>
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      ${item.price}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      {item.quantity}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                      ${item.price * item.quantity}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from(
              {
                length: Math.ceil(filteredCustomers.length / customersPerPage),
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 mx-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomersPage;
