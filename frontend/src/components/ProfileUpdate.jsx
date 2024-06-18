import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    role_id: '',
    tenant_id: ''
  });
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/auth/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include only necessary fields and conditionally include password
    const updateData = {
      username: profile.username,
      email: profile.email,
      ...(password && { password }) // Conditionally include password if it's not empty
    };

    console.log('Submitting update:', updateData); // Log the data being sent

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/auth/user/profile', 
      updateData, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(response.data.message);
      setPassword(''); // Clear password field after update
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md p-4 border rounded-lg shadow-lg">
      {/* <h1 className="text-2xl font-bold mb-4">Profile</h1> */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {message && <div className="text-green-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter a new password (optional)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role_id" className="block text-gray-700">Role ID</label>
          <input
            type="text"
            id="role_id"
            name="role_id"
            value={profile.role_id}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            readOnly // Read-only field as it should not be changed by the user
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenant_id" className="block text-gray-700">Tenant ID</label>
          <input
            type="text"
            id="tenant_id"
            name="tenant_id"
            value={profile.tenant_id}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            readOnly // Read-only field as it should not be changed by the user
          />
        </div>
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
