import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role_id: ''
  });
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
          setErrorMessage('No token found, please login.');
          return;
        }

        console.log('Fetching roles with token:', token); // Debugging log

        const response = await axios.get('http://localhost:5000/auth/role', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Roles response:', response.data); // Debugging log

        if (Array.isArray(response.data.roles)) {
          setRoles(response.data.roles);
        } else {
          console.error('Roles data is not an array:', response.data);
          setRoles([]); // Set to an empty array if the response is not as expected
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        setErrorMessage('Failed to fetch roles.');
        setRoles([]); // Set to an empty array in case of error
      }
    };
    fetchRoles();
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
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        setErrorMessage('No token found, please login.');
        return;
      }

      const response = await axios.post('http://localhost:5000/auth/user/createStaff', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating staff:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to create staff.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Staff Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="role_id" className="block font-medium mb-1">Role</label>
          <select id="role_id" name="role_id" value={formData.role_id} onChange={handleChange} className="border rounded px-3 py-2 w-full">
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Staff</button>
      </form>
    </div>
  );
};

export default StaffForm;
