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
    const fetchDiscounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/discounts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDiscounts(response.data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
        setError("Failed to fetch discounts. Please try again later.");
      }
    };
    fetchDiscounts();
  }, []);

  const updateDiscountedPriceInDB = async (
    itemType,
    itemId,
    discountedPrice
  ) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `http://localhost:5000/api/${itemType}s/${itemId}`;
      await axios.put(
        endpoint,
        { discountedPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(`Error updating discounted price for ${itemType}:`, error);
    }
  };

  const deleteDiscount = async (discountId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/discounts/${discountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDiscounts(
        discounts.filter((discount) => discount.discountId !== discountId)
      );
    } catch (error) {
      console.error(`Error deleting discount:`, error);
      setError("Failed to delete discount. Please try again later.");
    }
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateDiscountedPrice = (item, discount) => {
    if (!item) {
      return { discountedPrice: 0, discountAmount: 0 };
    }

    const originalPrice = item.price || 0;
    const discountValue = discount.value || 0;
    const discountType = discount.type || "percentage";

    let discountAmount = 0;

    if (discountType === "percentage") {
      discountAmount = (originalPrice * discountValue) / 100;
    } else if (discountType === "fixed") {
      discountAmount = discountValue;
    }

    const discountedPrice = originalPrice - discountAmount;

    const currentDate = new Date();
    const endDate = new Date(discount.endDate);

    if (currentDate > endDate) {
      updateDiscountedPriceInDB(item.itemType, item.itemId, originalPrice);
      return { discountedPrice: originalPrice, discountAmount: 0 };
    }

    updateDiscountedPriceInDB(item.itemType, item.itemId, discountedPrice);

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
      products,
      variants,
    } = discount;

    const combinedItems = [
      ...(products || []).map((product) => ({
        ...product,
        itemType: "Product",
        itemId: product.productId,
      })),
      ...(variants || []).map((variant) => ({
        ...variant,
        itemType: "Variant",
        itemId: variant.variantId,
      })),
    ];

    return (
      <tr key={discountId} className="border-t">
        <td className="p-2">{name}</td>
        <td className="p-2">{type}</td>
        <td className="p-2">
          {type === "percentage" ? `${value}%` : formatCurrency(value)}
        </td>
        <td className="p-2">{formatDate(startDate)}</td>
        <td className="p-2">{formatDate(endDate)}</td>
        <td className="p-2">
          {combinedItems.map((item, index) => {
            const { discountedPrice, discountAmount } =
              calculateDiscountedPrice(item, discount);

            return (
              <div
                key={`${discountId}_${item.itemType}_${index}`}
                className="mb-4 p-2 bg-gray-100 rounded"
              >
                <div className="mb-2">
                  <strong className="text-gray-700">{item.itemType}:</strong>
                  <span className="ml-2 text-gray-900">
                    {item.itemType === "Product" ? item.productname : item.name}
                  </span>
                </div>
                <div className="mb-2">
                  <strong className="text-gray-700">SKU:</strong>
                  <span className="ml-2 text-gray-900">{item.SKU}</span>
                </div>
                <div className="mb-2">
                  <strong className="text-gray-700">Original Price:</strong>
                  <span className="ml-2 text-gray-900">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <div className="mb-2">
                  <strong className="text-gray-700">Discount Applied:</strong>
                  <span className="ml-2 text-gray-900">
                    {type === "percentage"
                      ? `${discountAmount.toFixed(2)} (${value}%)`
                      : formatCurrency(discountAmount)}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700">Discounted Price:</strong>
                  <span className="ml-2 text-gray-900">
                    {formatCurrency(discountedPrice)}
                  </span>
                </div>
              </div>
            );
          })}
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
      {isModalOpen && (
        <UpdateDiscountModal
          isOpen={isModalOpen}
          handleClose={closeModal}
          discountId={selectedDiscountId}
        />
      )}
    </div>
  );
};

export default DiscountList;
