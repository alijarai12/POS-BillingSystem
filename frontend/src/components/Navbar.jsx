import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="lg:hidden">
        ☰
      </button>
      <h1 className="text-2xl">POS</h1>
      <nav className="hidden lg:flex space-x-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/products" className="hover:text-gray-300">
          Products
        </Link>
        <Link to="/customers" className="hover:text-gray-300">
          Customers
        </Link>
        <Link to="/sales" className="hover:text-gray-300">
          Sales
        </Link>
        <Link to="/barcode" className="hover:text-gray-300">
          Barcode
        </Link>
      </nav>
      <div className="hidden lg:flex space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <Link to="/cart" className="hover:text-gray-300 relative">
              <FaShoppingCart size={20} />
            </Link>

            <button onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
