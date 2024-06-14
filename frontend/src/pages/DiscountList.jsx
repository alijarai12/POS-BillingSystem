import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DiscountList = () => {
  const [discounts, setDiscounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/discounts");
      setDiscounts(response.data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
      setError("Failed to fetch discounts. Please try again later.");
    }
  };

  const updateDiscountedPriceInDB = async (
    itemType,
    itemId,
    discountedPrice
  ) => {
    try {
      const endpoint =
        itemType === "product"
          ? `http://localhost:5000/api/products/${itemId}`
          : `http://localhost:5000/api/variants/${itemId}`;
      await axios.put(endpoint, { discountedPrice });
    } catch (error) {
      console.error(`Error updating discounted price for ${itemType}:`, error);
    }
  };

  const calculateDiscountedPrice = (item, discount) => {
    const originalPrice = item.price;
    let discountAmount = 0;

    if (discount.type === "percentage") {
      discountAmount = (originalPrice * discount.value) / 100;
    } else if (discount.type === "fixed") {
      discountAmount = discount.value;
    }

    const discountedPrice = originalPrice - discountAmount;
    const itemType = item.productname ? "product" : "variant";
    const itemId = item.productname ? item.productId : item.variantId;

    // Update the discounted price in the database
    updateDiscountedPriceInDB(itemType, itemId, discountedPrice);

    return { discountedPrice, discountAmount };
  };

  const renderDiscountRow = (discount) => {
    const {
      discountId,
      name,
      type,
      value,
      startDate,
      endDate,
      product,
      variant,
    } = discount;

    const item = product || variant;

    // Check if the item (product or variant) exists
    if (!item) {
      return null; // Return null to skip rendering this row
    }

    const itemType = product ? "Product" : "Variant";
    const itemName = product ? product.productname : variant.name;
    const itemSKU = item.SKU;
    const itemPrice = item.price;

    const { discountedPrice, discountAmount } = calculateDiscountedPrice(
      item,
      discount
    );

    return (
      <tr
        key={discountId}
        className={product ? "border-t" : "border-t bg-gray-100"}
      >
        <td className="p-2">{name}</td>
        <td className="p-2">{type}</td>
        <td className="p-2">
          {type === "percentage" ? `${value}%` : `$${value}`}
        </td>
        <td className="p-2">{new Date(startDate).toLocaleDateString()}</td>
        <td className="p-2">{new Date(endDate).toLocaleDateString()}</td>
        <td className="p-2">
          <strong>{itemType}:</strong> {itemName}
          <br />
          <strong>SKU:</strong> {itemSKU}
          <br />
          <strong>Original Price:</strong> ${itemPrice.toFixed(2)}
          <br />
          <strong>Discount Applied:</strong>{" "}
          {type === "percentage"
            ? `${discountAmount.toFixed(2)} (${value}%)`
            : `$${discountAmount.toFixed(2)}`}
          <br />
          <strong>Discounted Price:</strong> ${discountedPrice.toFixed(2)}
        </td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Discount List</h1>
        <div>
          <Link
            to="/create-discount-product"
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
          >
            Discount Product or Variant
          </Link>
        </div>
      </div>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : discounts.length === 0 ? (
        <p className="text-center text-gray-500">No discounts available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Value</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">End Date</th>
              <th className="p-2 text-left">Item Details</th>
            </tr>
          </thead>
          <tbody>{discounts.map(renderDiscountRow)}</tbody>
        </table>
      )}
    </div>
  );
};

export default DiscountList;
