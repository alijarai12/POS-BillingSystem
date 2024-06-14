import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

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
  };

  return (
    <div className="mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name, number or address"
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Customer Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Customer Number
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {customer.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {customer.number}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {customer.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
