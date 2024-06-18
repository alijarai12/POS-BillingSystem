import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',    
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State to hold messages to display to the user
  const [message, setMessage] = useState('');

  // Handler to update form data state when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    
    // Create data object to send to backend
    const dataToSend = {
      ...formData
    };

    try {
      // Make a POST request to register the user
      const response = await axios.post('http://localhost:5000/auth/user/register', dataToSend);
      if (response && response.data) {
        console.log('Registration successful:', response.data);
        setMessage("Registration successful!");
      } else {
        console.error('Error registering: Response data is undefined.');
        setMessage('Error registering: Response data is undefined.');
      }
    }  catch (error) {
      console.error('Error registering:', error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Error registering: ${error.response.data.message}`);
      } else {
        setMessage('Error registering: An unexpected error occurred.');
      }
    }
  };
  
  return (
    <div className="max-w-md p-4 border rounded-lg shadow-lg">
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Confirm your password"
            required
          />
        </div>

        <Button type="submit" className="mt-2" color="primary">Register</Button>
      </form>
    </div>
  );
}

export default Register;
