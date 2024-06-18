import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      if (searchTerm.length > 0) {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get(
            "http://localhost:5000/api/customers",
            {
              params: { search: searchTerm },
            }
          );
          if (response.data.length > 0) {
            setFilteredCustomers(response.data);
          } else {
            setFilteredCustomers([]);
            setError("Customer not found");
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
          setError("Error fetching customers");
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredCustomers([]);
        setError("");
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCustomers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700">Search Customer</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
      />
      {loading && <div>Loading...</div>}
      {error && !loading && <div className="text-red-500">{error}</div>}
      {filteredCustomers.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-2 rounded shadow-lg">
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => {
                onSelect(customer);
                setSearchTerm("");
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {customer.name} ({customer.number})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
