import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateDiscountModal from "./UpdateDiscountModal";

const DiscountList = () => {
  const [discounts, setDiscounts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);

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

  const deleteDiscount = async (discountId) => {
    try {
      await axios.delete(`http://localhost:5000/api/discounts/${discountId}`);
      setDiscounts(
        discounts.filter((discount) => discount.discountId !== discountId)
      );
    } catch (error) {
      console.error(`Error deleting discount:`, error);
      setError("Failed to delete discount. Please try again later.");
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

    // Check if the discount has expired
    const currentDate = new Date();
    const endDate = new Date(discount.endDate);
    if (currentDate > endDate) {
      // If end date has passed, update discounted price in database
      updateDiscountedPriceInDB(itemType, itemId, originalPrice);
      return { discountedPrice: originalPrice, discountAmount: 0 };
    }

    // Update the discounted price in the database
    updateDiscountedPriceInDB(itemType, itemId, discountedPrice);

    return { discountedPrice, discountAmount };
  };

  const openModal = (discountId) => {
    setSelectedDiscountId(discountId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDiscountId(null);
    setIsModalOpen(false);
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

    let itemType, itemName, itemSKU, itemPrice, discountedPrice, discountAmount;

    if (item) {
      itemType = product ? "Product" : "Variant";
      itemName = product ? product.productname : variant.name;
      itemSKU = item.SKU;
      itemPrice = item.price;

      ({ discountedPrice, discountAmount } = calculateDiscountedPrice(
        item,
        discount
      ));
    } else {
      itemType = "N/A";
      itemName = "N/A";
      itemSKU = "N/A";
      itemPrice = 0;
      discountedPrice = 0;
      discountAmount = 0;
    }

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
          <strong>Discount Applied:</strong>
          {type === "percentage"
            ? `${discountAmount.toFixed(2)} (${value}%)`
            : `$${discountAmount.toFixed(2)}`}
          <br />
          <strong>Discounted Price:</strong> ${discountedPrice.toFixed(2)}
        </td>
        <td className="p-2 flex space-x-2">
          <button
            onClick={() => deleteDiscount(discountId)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
          <button
            onClick={() => openModal(discountId)}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            Update
          </button>
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
      {error || discounts.length === 0 ? (
        <p className="text-center text-red-500">
          {error || "No discounts available."}
        </p>
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
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>{discounts.map(renderDiscountRow)}</tbody>
        </table>
      )}
      <UpdateDiscountModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        discountId={selectedDiscountId}
      />
    </div>
  );
};

export default DiscountList;
