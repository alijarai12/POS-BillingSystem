import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    brand: ""
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const categories = [...new Set(products.map(product => product.category))];
    setCategories(categories);

    const brands = [...new Set(products.map(product => product.brand))];
    setBrands(brands);

    applyFilters();
  }, [filter, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const applyFilters = () => {
    let filtered = products;

    if (filter.category) {
      filtered = filtered.filter(
        (product) => product.category === filter.category
      );
    }

    if (filter.brand) {
      filtered = filtered.filter(
        (product) => product.brand === filter.brand
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Product List</h2>
        <Link to={`/products/add-products`}>
          <Button color="primary" variant="flat">+ Add Products</Button>
        </Link>
      </div>
      <div className="flex justify-end mb-4">
        <Select
          placeholder="Category"
          value={filter.category}
          onChange={(value) => handleFilterChange("category", value)}
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        <Select
          placeholder="Brand"
          value={filter.brand}
          onChange={(value) => handleFilterChange("brand", value)}
        >
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </Select>
        <Button color="secondary" onClick={applyFilters}>Apply Filters</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {(filteredProducts.length ? filteredProducts : products).map((product) => (
          <div key={product.productId} className="border-t p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
            <p className="text-gray-700 mb-2">Company: {product.company}</p>
            <Link to={`/products/${product.productId}`}>
              <Button color="warning" size="sm">View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
