import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Input, Textarea } from "@nextui-org/react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/products", formData); // Adjust the URL to your API endpoint
      console.log("Product added:", response.data);
      setSuccess(true);
      setFormData({
        name: "",
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

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <Input
            type="text"
            id="name"
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></Textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="SKU" className="block text-gray-700 font-bold mb-2">
            SKU
          </label>
          <Input
            type="text"
            id="SKU"
            name="SKU"
            label="SKU"
            value={formData.SKU}
            onChange={handleChange}
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <Input
            type="number"
            id="price"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">
            Stock
          </label>
          <Input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Category
          </label>
          <Input
            type="text"
            id="category"
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">
            Brand
          </label>
          <Input
            type="text"
            id="brand"
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-gray-700 font-bold mb-2"
          >
            Company
          </label>
          <Input
            type="text"
            id="company"
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            required
            // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
