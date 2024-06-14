import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaBarcode,
  FaDollarSign,
} from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isSalesOpen, setSalesOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const toggleSales = () => {
    setSalesOpen(!isSalesOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  return (
    <div
      className={` top-0 left-0 z-30 w-64 bg-gray-900 text-white transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 mb-6">
        <h2 className="text-3xl font-bold">MyApp</h2>
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          X
        </button>
      </div>
      <div className="mb-4 px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      <ul className="space-y-4 px-4">
        <li className="group">
          <button
            onClick={toggleProducts}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaBox className="mr-3" />
              Products
            </span>
            {isProductsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isProductsOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link
                  to="/products"
                  className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Product List
                </Link>
              </li>
              <li>
                <Link
                  to="/variants"
                  className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Variants
                </Link>
              </li>
              <li>
                <Link
                  to="/products/add-products"
                  className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/variants/add-variants"
                  className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Add Variants
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/customers"
            className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <FaUsers className="mr-3" />
            Customers
          </Link>
        </li>
        <li>
          <Link
            to="/bill"
            className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <RiBillFill className="mr-3" />
              Bill
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/discounts"
            className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <MdDiscount className="mr-3" />
              Discount
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/tax"
            className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <MdDiscount className="mr-3" />
              TAX
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/barcode"
            className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <FaBarcode className="mr-3" />
            Barcode{" "}
          </Link>
        </li>
        <li className="group">
          <button
            onClick={toggleSales}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaDollarSign className="mr-3" />
              Sales
            </span>
            {isSalesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isSalesOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link
                  to="/sales"
                  className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Sales List
                </Link>
              </li>

              <li>
                <Link
                  to="/sales/reports"
                  className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Sales Reports
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
