import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const UpdateDiscountModal = ({ isOpen, handleClose, discountId }) => {
  const [discountData, setDiscountData] = useState({
    name: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    selectedOption: null,
  });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchDiscountDetails = async () => {
      if (discountId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/discounts/${discountId}`
          );
          const discount = response.data;

          setDiscountData({
            name: discount.name,
            type: discount.type,
            value: discount.value,
            startDate: discount.startDate.split("T")[0],
            endDate: discount.endDate.split("T")[0],
            selectedOption: discount.product
              ? {
                  value: discount.product.productId,
                  label: discount.product.productname,
                  isProduct: true,
                }
              : discount.variant
              ? {
                  value: discount.variant.variantId,
                  label: `${discount.variant.product.productname} - ${discount.variant.name}`,
                  isProduct: false,
                }
              : null,
          });
        } catch (error) {
          console.error("Error fetching discount details:", error);
          setError("Failed to fetch discount details. Please try again.");
        }
      }
    };

    fetchDiscountDetails();
  }, [discountId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsResponse = await axios.get(
          "http://localhost:5000/api/products"
        );
        const productsData = productsResponse.data;

        const options = productsData.flatMap((product) => {
          const productOption = {
            value: product.productId,
            label: product.productname,
            isProduct: true,
          };

          const variantOptions = product.variants.map((variant) => ({
            value: variant.variantId,
            label: `${product.productname} - ${variant.name}`,
            isProduct: false,
            parentProductId: product.productId,
          }));

          return [productOption, ...variantOptions];
        });

        setDropdownOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products and variants. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setDiscountData((prevData) => ({
      ...prevData,
      selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    const { name, type, value, startDate, endDate, selectedOption } =
      discountData;
    const payload = {
      name,
      type,
      value,
      startDate,
      endDate,
      productId:
        selectedOption && selectedOption.isProduct
          ? selectedOption.value
          : null,
      variantId:
        selectedOption && !selectedOption.isProduct
          ? selectedOption.value
          : null,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/discounts/${discountId}`,
        payload
      );
      setSuccessMessage("Discount updated successfully.");
      setTimeout(() => {
        handleClose();
      }, 2000); // Close the modal after 2 seconds
    } catch (error) {
      console.error("Error updating discount:", error);
      setError("Failed to update discount. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Discount</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={discountData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={discountData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Value</label>
            <input
              type="number"
              name="value"
              value={discountData.value}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={discountData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={discountData.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product/Variant</label>
            <Select
              value={discountData.selectedOption}
              onChange={handleSelectChange}
              options={dropdownOptions}
              isClearable
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDiscountModal;
