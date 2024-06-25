import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex mt-4">
              <a href="#" className="mr-4">
                <FaFacebook className="text-white hover:text-gray-400 transition duration-300" />
              </a>
              <a href="#" className="mr-4">
                <FaTwitter className="text-white hover:text-gray-400 transition duration-300" />
              </a>
              <a href="#" className="mr-4">
                <FaLinkedin className="text-white hover:text-gray-400 transition duration-300" />
              </a>
              <a href="#" className="mr-4">
                <FaInstagram className="text-white hover:text-gray-400 transition duration-300" />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  href="#"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Products
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm">
              123 Main Street, Cityville
              <br />
              State, Country
              <br />
              Email: info@example.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
        <hr className="border-gray-600 my-8" />
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Your Company. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
