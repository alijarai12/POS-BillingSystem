import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import Select from "react-select";

const CreateTax = () => {
  const [taxData, setTaxData] = useState({
    name: "",
    type: "percentage",
    rate: "",
    description: "",
    productId: null,
    variantId: null,
  });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
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

        setDropdownOptions([{ value: null, label: "None" }, ...options]);
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
    setTaxData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductVariantChange = (selectedOption) => {
    setTaxData((prevState) => ({
      ...prevState,
      selectedOption,
      productId: selectedOption?.isProduct
        ? selectedOption.value
        : selectedOption?.parentProductId || null,
      variantId: !selectedOption?.isProduct ? selectedOption.value : null,
    }));
    setError("");
    setValidationErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationErrors([]);
    setSuccessMessage("");

    try {
      const filteredTaxData = Object.fromEntries(
        Object.entries(taxData).filter(([key, value]) => value !== "")
      );

      const response = await axios.post(
        "http://localhost:5000/api/taxes",
        filteredTaxData
      );
      console.log("Tax created:", response.data);
      setSuccessMessage("Tax created successfully!");
      setTaxData({
        name: "",
        type: "percentage",
        rate: "",
        description: "",
        productId: null,
        variantId: null,
        selectedOption: null,
      });
    } catch (error) {
      console.error("Error creating tax:", error);
      if (error.response && error.response.data.error === "Validation error") {
        setValidationErrors(error.response.data.validationErrors);
        setError("Validation error occurred. Please check the form fields.");
      } else {
        setError(
          error.response?.data?.error ||
            error.message ||
            "Failed to create tax. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Tax Product or Variant
        </h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {validationErrors.length > 0 && (
          <div className="mb-4">
            <h3 className="text-red-600 font-semibold">Validation Errors:</h3>
            <ul className="text-red-600 list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
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
              value={taxData.name}
              onChange={handleChange}
              placeholder="Enter tax name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Tax Type
            </label>
            <select
              id="type"
              name="type"
              value={taxData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="rate"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Tax Rate
            </label>
            <input
              type="number"
              id="rate"
              name="rate"
              value={taxData.rate}
              onChange={handleChange}
              placeholder="Enter tax rate"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={taxData.description}
              onChange={handleChange}
              placeholder="Enter tax description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
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
              value={taxData.selectedOption}
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
              {isLoading ? <Spinner color="white" size="sm" /> : "Create Tax"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTax;
