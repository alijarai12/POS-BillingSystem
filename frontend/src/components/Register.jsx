import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role_id: '', // Required field
    tenant_id: '' // Optional field for SuperAdmin
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

    // Validate and convert role_id to integer
    const roleId = parseInt(formData.role_id, 10);
    if (isNaN(roleId)) {
      setMessage("Role ID must be a valid integer.");
      return;
    }

    // Validate and convert tenant_id to integer if provided
    const tenantId = formData.tenant_id ? parseInt(formData.tenant_id, 10) : null;
    if (formData.tenant_id && isNaN(tenantId)) {
      setMessage("Tenant ID must be a valid integer.");
      return;
    }

    // Create data object to send to backend
    const dataToSend = {
      ...formData,
      role_id: roleId,
      tenant_id: tenantId
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
    } catch (error) {
      console.error('Error registering:', error.response?.data || error.message);
      setMessage('Error registering: ' + (error.response?.data?.message || error.message));
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

        <div className="mb-4">
          <label htmlFor="role_id" className="block text-gray-700">Role ID</label>
          <input
            type="text"
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your role ID"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tenant_id" className="block text-gray-700">Tenant ID (Optional for SuperAdmin)</label>
          <input
            type="text"
            id="tenant_id"
            name="tenant_id"
            value={formData.tenant_id}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your tenant ID"
          />
        </div>

        <Button type="submit" className="mt-2" color="primary">Register</Button>
      </form>
    </div>
  );
}

export default Register;
