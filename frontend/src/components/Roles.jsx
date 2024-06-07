import React, { useState } from 'react';
import axios from 'axios';

const RoleForm = () => {
  const [roleName, setRoleName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/role/', 
        { role_name: roleName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(response.data.message);
      setError('');
      setRoleName('');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="roleName" className="block text-gray-700">Role Name:</label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter role name"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-300`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Role'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default RoleForm;
