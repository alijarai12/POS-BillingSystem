import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    role_id: '',
    tenant_id: ''
  });
  const [roles, setRoles] = useState([]);
  const [tenants, setTenants] = useState([]);
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

    const fetchRolesAndTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        const [roleResponse, tenantResponse] = await Promise.all([
          axios.get('http://localhost:5000/auth/role/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/auth/tenant/', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (Array.isArray(roleResponse.data.roles)) {
          setRoles(roleResponse.data.roles);
        } else {
          console.error('Roles response is not an array:', roleResponse.data);
        }

        if (Array.isArray(tenantResponse.data.tenant)) {
          setTenants(tenantResponse.data.tenant);
        } else {
          console.error('Tenants response is not an array:', tenantResponse.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchProfile();
    fetchRolesAndTenants();
  }, []);

  const getRoleName = (roleId) => {
    const role = roles.find(role => role.role_id === roleId);
    return role ? role.role_name : 'Null';
  };

  const getTenantName = (tenantId) => {
    const tenant = tenants.find(tenant => tenant.tenant_id === tenantId);
    return tenant ? tenant.fullname : 'Null';
  };

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
    
    const updateData = {
      username: profile.username,
      email: profile.email,
      ...(password && { password }) // Conditionally include password if it's not empty
    };

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
      console.error('Error response:', err.response); // Log the error response
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md p-4 border rounded-lg shadow-lg">
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
            placeholder="*************"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role_id" className="block text-gray-700">Role</label>
          <input
            type="text"
            id="role_id"
            name="role_id"
            value={getRoleName(profile.role_id)}
            readOnly
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenant_id" className="block text-gray-700">Tenant</label>
          <input
            type="text"
            id="tenant_id"
            name="tenant_id"
            value={getTenantName(profile.tenant_id)}
            readOnly
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
          />
        </div>
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
