import React, { useRef, useImperativeHandle } from "react";
import { useReactToPrint } from "react-to-print";

const PrintComponent = React.forwardRef(
  ({ bill = {}, tenantDetails = {} }, ref) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    useImperativeHandle(ref, () => ({
      handlePrint: handlePrint,
    }));

    return (
      <div ref={componentRef} className="hidden-print">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              {tenantDetails.business_name && (
                <>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {tenantDetails.business_name}
                  </h1>
                  {tenantDetails.address && (
                    <p className="text-sm text-gray-600">
                      {tenantDetails.address}
                    </p>
                  )}
                  {tenantDetails.contact && (
                    <p className="text-sm text-gray-600">
                      {tenantDetails.contact}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Bill ID: {bill.id || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Date:{" "}
                {bill.date ? new Date(bill.date).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Customer Information
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">
                Name: {bill.customerName || "N/A"}
              </p>
              <p className="text-gray-700">
                Number: {bill.customerNumber || "N/A"}
              </p>
              <p className="text-gray-700">Address: {bill.address || "N/A"}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment Details
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">
                Payment Mode: {bill.paymentMode || "N/A"}
              </p>
              <p className="text-gray-700">
                Payment Status: {bill.paymentStatus || "N/A"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border text-left">Item Name</th>
                    <th className="py-2 px-4 border text-left">Quantity</th>
                    <th className="py-2 px-4 border text-left">Price</th>
                    <th className="py-2 px-4 border text-left">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.cartItems ? (
                    bill.cartItems.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="py-2 px-4 border">{item.name}</td>
                        <td className="py-2 px-4 border">{item.quantity}</td>
                        <td className="py-2 px-4 border">
                          {item.price !== undefined && item.price !== null
                            ? `$${item.price.toFixed(2)}`
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4 border">
                          {item.price !== undefined && item.price !== null
                            ? `$${(item.price * item.quantity).toFixed(2)}`
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 px-4 border" colSpan="4">
                        No items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-700 mb-2">
              Subtotal: ${bill.subTotal ? bill.subTotal.toFixed(2) : "N/A"}
            </p>
            <p className="text-gray-700 mb-2">
              Tax: ${bill.tax ? bill.tax.toFixed(2) : "N/A"}
            </p>
            <p className="text-xl font-bold text-gray-800">
              Total: ${bill.totalAmount ? bill.totalAmount.toFixed(2) : "N/A"}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default PrintComponent;
