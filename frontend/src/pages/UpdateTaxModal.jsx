import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import Select from "react-select";

const UpdateTaxModal = ({ isOpen, taxId, onClose, onUpdate }) => {
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
        const token = localStorage.getItem("token");
        const productsResponse = await axios.get(
          "http://localhost:5000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

        if (taxId) {
          const token = localStorage.getItem("token");
          const taxResponse = await axios.get(
            `http://localhost:5000/api/taxes/${taxId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTaxData(taxResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Failed to fetch products, variants, and tax data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [taxId]);

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
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/taxes/${taxId}`,
        filteredTaxData,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Tax updated:", response.data);
      setSuccessMessage("Tax updated successfully!");
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating tax:", error);
      if (error.response && error.response.data.error === "Validation error") {
        setValidationErrors(error.response.data.validationErrors);
        setError("Validation error occurred. Please check the form fields.");
      } else {
        setError(
          error.response?.data?.error ||
            error.message ||
            "Failed to update tax. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Update Tax
                    </h3>
                    {error && (
                      <p className="text-red-600 mb-4 text-center">{error}</p>
                    )}
                    {validationErrors.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-red-600 font-semibold">
                          Validation Errors:
                        </h3>
                        <ul className="text-red-600 list-disc list-inside">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {successMessage && (
                      <p className="text-green-600 mb-4 text-center">
                        {successMessage}
                      </p>
                    )}
                    <div className="mt-2">
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
                        {/* ... (other form fields remain the same) */}

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
                              option: (
                                base,
                                { isDisabled, isFocused, isSelected }
                              ) => ({
                                ...base,
                                backgroundColor: isDisabled
                                  ? null
                                  : isSelected
                                  ? "#3b82f6"
                                  : isFocused
                                  ? "#e0f2fe"
                                  : null,
                                color: isDisabled
                                  ? "#ccc"
                                  : isSelected
                                  ? "white"
                                  : "black",
                                cursor: isDisabled ? "not-allowed" : "default",
                              }),
                              menu: (base) => ({
                                ...base,
                                maxHeight: "200px",
                                overflowY: "auto",
                              }),
                            }}
                            formatOptionLabel={(option) => (
                              <span
                                style={{
                                  paddingLeft: option.isProduct ? 0 : 20,
                                }}
                              >
                                {option.label}
                              </span>
                            )}
                          />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Spinner color="white" size="sm" />
                            ) : (
                              "Update"
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTaxModal;
