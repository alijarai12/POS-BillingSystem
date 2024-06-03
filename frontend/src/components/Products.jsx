import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Input, Textarea } from "@nextui-org/react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    SKU: "",
    price: "",
    stock: 0,
    category: "",
    brand: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      // Generate SKU when company name changes
      const sku = generateSKU(value);
      setFormData({ ...formData, [name]: value, SKU: sku });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData
      ); // Adjust the URL to your API endpoint
      console.log("Product added:", response.data);
      setSuccess(true);
      setFormData({
        productname: "",
        description: "",
        SKU: "",
        price: 0,
        stock: 0,
        category: "",
        brand: "",
        company: "",
      });
    } catch (error) {
      setError("Failed to add product");
      console.error("There was an error adding the product!", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSKU = (company) => {
    const prefix = company.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-5);
    return `${prefix}-${timestamp}`;
  };

  const formFields = [
    { id: "productname", label: "Product Name", type: "text", required: true },
    { id: "description", label: "Description", type: "textarea" },
    { id: "SKU", label: "SKU", type: "text" },
    {
      id: "price",
      label: "Price",
      type: "number",
      required: true,
      min: "0",
      step: "0.01",
    },
    { id: "stock", label: "Stock", type: "number", required: true, min: "0" },
    { id: "category", label: "Category", type: "text", required: true },
    { id: "brand", label: "Brand", type: "text" },
    { id: "company", label: "Company", type: "text", required: true },
  ];

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md fade-in mt-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-violet-800 text-center">
          Add New Product
        </h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && (
          <div className="mb-4 text-green-500">Product added successfully!</div>
        )}

        {formFields.map(({ id, label, type, required, min, step }) => (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
              {label}
            </label>
            {type === "textarea" ? (
              <Textarea
                id={id}
                name={id}
                label={label}
                value={formData[id]}
                onChange={handleChange}
                required={required}
                // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <Input
                type={type}
                id={id}
                name={id}
                label={label}
                value={formData[id]}
                onChange={handleChange}
                required={required}
                min={min}
                step={step}
                // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            disabled={loading}
            color="primary"
            // className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Submitting..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
