import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import PrintComponent from "./PrintPage";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const componentRefs = useRef({});

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bills");
        setBills(response.data);
      } catch (error) {
        setError("Error fetching bills. Please try again later.");
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const filteredBills = useMemo(() => {
    return bills.filter(
      (bill) =>
        bill.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id?.toString().includes(searchTerm)
    );
  }, [bills, searchTerm]);

  const handlePrint = (billId) => {
    const billRef = componentRefs.current[billId];
    if (billRef && billRef.handlePrint) {
      billRef.handlePrint();
    } else {
      console.error("Print function not available for this bill.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Bill History</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name or bill ID"
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {filteredBills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Bill ID
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Customer Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Customer Number
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Address
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Date
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Payment Mode
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Payment Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Cart Items
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Subtotal
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Tax
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Total
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill, index) => (
                <tr key={bill.id || index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {bill.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {bill.customerName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {bill.customerNumber}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {bill.address}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {bill.paymentMode}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    {bill.paymentStatus}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    <ul>
                      {bill.cartItems?.map((item, index) => (
                        <li key={item.id || index}>
                          {item.name} - $
                          {item.price !== undefined && item.price !== null
                            ? item.price.toFixed(2)
                            : "N/A"}{" "}
                          - Qty: {item.quantity}-Total: $
                          {(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    ${bill.subTotal ? bill.subTotal.toFixed(2) : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    ${bill.tax ? bill.tax.toFixed(2) : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    ${bill.totalAmount ? bill.totalAmount.toFixed(2) : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    <button
                      onClick={() => handlePrint(bill.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {bills.map((bill, index) => (
        <div key={bill.id || index} className="hidden">
          <PrintComponent
            ref={(el) => (componentRefs.current[bill.id] = el)}
            bill={bill}
          />
        </div>
      ))}
    </div>
  );
};

export default BillPage;
