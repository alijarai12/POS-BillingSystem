import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">MyApp</h2>
            <p className="text-gray-400">© 2024 MyApp. All rights reserved.</p>
          </div>
          <ul className="flex space-x-4 mb-4 md:mb-0">
            <li><a href="#" className="hover:text-gray-300 transition duration-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition duration-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300 transition duration-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300 transition duration-300">Contact</a></li>
          </ul>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
