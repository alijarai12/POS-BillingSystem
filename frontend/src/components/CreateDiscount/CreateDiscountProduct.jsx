import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import Select from "react-select";

const CreateDiscount = () => {
  const [discountData, setDiscountData] = useState({
    name: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    selectedOption: null, // New state to hold the selected option
  });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductVariantChange = (selectedOption) => {
    setDiscountData((prevState) => ({
      ...prevState,
      selectedOption,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const filteredDiscountData = Object.fromEntries(
        Object.entries(discountData).filter(([key, value]) => value !== "")
      );

      const requestData = {
        ...filteredDiscountData,
        productId: discountData.selectedOption?.isProduct
          ? discountData.selectedOption.value
          : null,
        variantId: !discountData.selectedOption?.isProduct
          ? discountData.selectedOption.value
          : null,
      };

      const response = await axios.post(
        "http://localhost:5000/api/discounts",
        requestData
      );
      console.log("Discount created:", response.data);
      setSuccessMessage("Discount created successfully!");
      setDiscountData({
        name: "",
        type: "percentage",
        value: "",
        startDate: "",
        endDate: "",
        selectedOption: null,
      });
    } catch (error) {
      console.error("Error creating discount:", error);
      setError(
        error.response?.data?.error ||
          "Failed to create discount. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Discount Product or Variant
        </h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-600 mb-4 text-center">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={discountData.name}
              onChange={handleChange}
              placeholder="Enter discount name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Discount Type
            </label>
            <select
              id="type"
              name="type"
              value={discountData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="value"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Discount Value
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={discountData.value}
              onChange={handleChange}
              placeholder="Enter discount value"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={discountData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={discountData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productId"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Product or Variant
            </label>
            <Select
              id="productId"
              name="productId"
              value={discountData.selectedOption}
              onChange={handleProductVariantChange}
              options={dropdownOptions}
              placeholder="Select Product or Variant"
              className="w-full"
              styles={{
                control: (base) => ({
                  ...base,
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  boxShadow: "none",
                  "&:hover": {
                    border: "1px solid #3b82f6",
                  },
                }),
                option: (base, { isDisabled, isFocused, isSelected }) => ({
                  ...base,
                  backgroundColor: isDisabled
                    ? null
                    : isSelected
                    ? "#3b82f6"
                    : isFocused
                    ? "#e0f2fe"
                    : null,
                  color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
                  cursor: isDisabled ? "not-allowed" : "default",
                }),
                menu: (base) => ({
                  ...base,
                  maxHeight: "200px",
                  overflowY: "auto",
                }),
              }}
              formatOptionLabel={(option) => (
                <span style={{ paddingLeft: option.isProduct ? 0 : 20 }}>
                  {option.label}
                </span>
              )}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Create Discount"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscount;
