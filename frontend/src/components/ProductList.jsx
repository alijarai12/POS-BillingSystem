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

  useEffect(() => {
    products.forEach((product) => {
      if (product.stock <= product.threshold) {
        alert(
          `Low Stock Alert: ${product.productname} is running low on stock!`
        );
      }
    });
  }, [products]);

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
      (searchQuery === "" ||
        product.productname.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-3xl font-roboto text-violet-800">
          Product List
        </h2>
        <div >
          <Link to={`/products/add-products`}>
            <Button
              color="secondary"
              variant="ghost"
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg border-none mr-2"
            >
              + Products
            </Button>
          </Link>
          <Link to={`/products/add-bulk`}>
            <Button
              color="secondary"
              variant="ghost"
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg border-none"
            >
              + Bulk
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-3 my-2 border-none bg-inherit">
        <div className="flex justify-between gap-2 items-center flex-wrap">
          <Input
            id="searchQuery"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            labelPlacement="outside"
            onChange={handleSearchChange}
            size="sm"
            classNames={{
              base: "w-full sm:max-w-[30%]",
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
              size="sm"
              className="rounded-lg w-[150px] hover"
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
              size="sm"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-700 text-center">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="border-t rounded-lg shadow-lg overflow-hidden hover:shadow-xl"
            >
              <Link to={`/products/${product.productId}`}>
                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/images/${product.image}`
                      : "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={product.productname}
                  className="object-cover h-56 w-full cursor-pointer"
                />
              </Link>
              <div className="p-3 flex flex-row justify-between">
                <h3 className="text-lg font-semibold text-black">
                  {product.productname}
                </h3>
                <p className="text-lg text-rose-700	">$ {product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
