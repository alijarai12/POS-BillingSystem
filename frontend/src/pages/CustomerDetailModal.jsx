import React from "react";

const CustomerDetailModal = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">{customer.name}</h2>
        <p>
          <strong>Number:</strong> {customer.number}
        </p>
        <p>
          <strong>Address:</strong> {customer.address}
        </p>
        <h3 className="text-xl font-semibold mt-4">Order History:</h3>
        <ul className="list-disc pl-4">
          {customer.orders.map((order, index) => (
            <li key={index}>
              <div>Date: {new Date(order.date).toLocaleDateString()}</div>
              <table className="border-collapse w-full">
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
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
