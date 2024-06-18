import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

const CartModal = ({ isVisible, onClose, onSubmit, customers }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setCustomerName("");
      setCustomerNumber("");
      setAddress("");
      setPaymentMode("Cash");
      setPaymentStatus("Pending");
      setError("");
    }
  }, [isVisible]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (error) return;
    onSubmit({
      customerName,
      customerNumber,
      address,
      paymentMode,
      paymentStatus,
    });
  };

  const handleCustomerSelect = (customer) => {
    setCustomerName(customer.name);
    setCustomerNumber(customer.number);
    setAddress(customer.address);
  };

  const handleCustomerNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Check if value is numeric
      setCustomerNumber(value);
      if (value.length === 10) {
        setError("");
      } else {
        setError("Customer number must be exactly 10 digits.");
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-xl font-semibold mb-4">Bill Details</h2>

          <SearchBar customers={customers} onSelect={handleCustomerSelect} />

          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Phone Number</label>
            <input
              type="text"
              value={customerNumber}
              onChange={handleCustomerNumberChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
};

export default CartModal;
