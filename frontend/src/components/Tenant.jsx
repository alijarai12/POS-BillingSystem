import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card } from '@nextui-org/react';

const CreateTenantUserForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    contact: '',
    business_name: '',
    ownerUsername: '',
    ownerEmail: '',
    ownerPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle case when token is not available (e.g., redirect to login)
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (formData.ownerPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.ownerEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const dataToSend = {
      ...formData
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/user/createTenant', dataToSend);
      if (response && response.data) {
        console.log('Registration successful:', response.data);
        setMessage("Registration successful!");
        setFormData({
          address: '',
          contact: '',
          business_name: '',
          ownerUsername: '',
          ownerEmail: '',
          ownerPassword: '',
          confirmPassword: ''
        });
      } else {
        console.error('Error registering: Response data is undefined.');
        setMessage('Error registering: Response data is undefined.');
      }
    } catch (error) {
      console.error('Error registering:', error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Error registering: ${error.response.data.message}`);
        if (error.response.data.details) {
          setMessage(prevMessage => `${prevMessage}\n${error.response.data.details.map(detail => detail.message).join('\n')}`);
        }
      } else {
        setMessage('Error registering: An unexpected error occurred.');
      }
    }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h3 className="text-center mb-4">Store Registration Form </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
              clearable
              bordered
              fullWidth
              label="Username"
              name="ownerUsername"
              value={formData.ownerUsername}
              onChange={handleChange} 
              isRequired             
            />

            <Input
              clearable
              bordered
              fullWidth
              label="Business Name"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}   
              isRequired           
            />

          <Input
            clearable
            bordered
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <Input
            clearable
            bordered
            fullWidth
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          
          <Input
            clearable
            bordered
            fullWidth
            label="Owner Email"
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            isRequired
          />

          <Input
            clearable
            bordered
            fullWidth
            label="Password"
            type="password"
            name="ownerPassword"
            value={formData.ownerPassword}
            onChange={handleChange}
          />

          <Input
            clearable
            bordered
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit" color="primary" className="w-full">Create</Button>
        </form>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </Card>
    </div>
  );
};

export default CreateTenantUserForm;
