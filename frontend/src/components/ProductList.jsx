import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Input, Select, SelectItem, Card } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({ category: "", brand: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      extractCategoriesAndBrands(response.data);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const extractCategoriesAndBrands = (products) => {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    const brands = [...new Set(products.map((product) => product.brand))];
    setCategories(categories);
    setBrands(brands);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === "" || product.category === filters.category) &&
      (filters.brand === "" || product.brand === filters.brand) &&
      (searchQuery === "" || product.productname.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Product List</h2>
        <Link to={`/products/add-products`}>
          <Button color="primary" variant="flat">
            + Add Products
          </Button>
        </Link>
      </div>
      <Card className="flex flex-col gap-4 p-4 mb-2">
        <div className="flex justify-between gap-2 items-center flex-wrap">
          <Input
            id="searchQuery"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            size="sm"
            classNames={{
              base: "w-full sm:max-w-[49%]",
              inputWrapper: "border-1 px-2 py-0 h-[40px] text-sm",
            }}
            startContent={<FaSearch className="text-default-300" />}
          />
          <div className="flex gap-2">
            <Select
              id="categoryFilter"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              placeholder="Select a Category"
              size="md"
              className="rounded-lg w-[150px]"
          
              // className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
            <Select
              id="brandFilter"
              name="brand" 
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Select a brand"
              size="md"
              className="rounded-lg w-[150px]"
            >
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-700 text-center">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="border-t p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold mb-2">{product.productname}</h3>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
              <p className="text-gray-700 mb-2">Category: {product.category}</p>
              <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
              <p className="text-gray-700 mb-2">Company: {product.company}</p>
              <Link to={`/products/${product.productId}`}>
                <Button color="warning" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
