import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card } from '@nextui-org/react';

const CreateTenantUserForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    address: '',
    phone_number: '',
    ownerUsername: '',
    ownerEmail: '',
    ownerPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle case when token is not available (e.g., redirect to login)
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/auth/user/createTenant', formData);
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h3 className="text-center mb-4">Tenant Registration Form </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            clearable
            bordered
            fullWidth
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            bordered
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            bordered
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            bordered
            fullWidth
            label="Owner Username"
            name="ownerUsername"
            value={formData.ownerUsername}
            onChange={handleChange}
            required
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
            required
          />
          <Input
            clearable
            bordered
            fullWidth
            label="Owner Password"
            type="password"
            name="ownerPassword"
            value={formData.ownerPassword}
            onChange={handleChange}
            required
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
