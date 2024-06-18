import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignPermissionForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    permission_ids: []
  });
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('No token found, please login.');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [permissionsRes, usersRes, loggedInUserRes] = await Promise.all([
          axios.get('http://localhost:5000/auth/permission/', { headers }),
          axios.get('http://localhost:5000/auth/user/', { headers }),
          axios.get('http://localhost:5000/auth/user/profile', { headers }) // Assuming this endpoint gives logged-in user details
        ]);

        const loggedInUser = loggedInUserRes.data;

        if (Array.isArray(permissionsRes.data.permissions)) {
          setPermissions(permissionsRes.data.permissions);
        } else {
          console.error('Permissions data is not an array:', permissionsRes.data);
          setPermissions([]);
        }

        if (Array.isArray(usersRes.data)) {
          const filteredUsers = usersRes.data.filter(user => user.tenant_id === loggedInUser.tenant_id && user.user_id !== loggedInUser.user_id);
          setUsers(filteredUsers);
        } else {
          console.error('Users data is not an array:', usersRes.data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to fetch data.');
        setPermissions([]);
        setUsers([]);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedIds = checked
          ? [...prevData.permission_ids, value]
          : prevData.permission_ids.filter((id) => id !== value);
        console.log('Updated Permission IDs:', updatedIds);  // Debugging log
        return {
          ...prevData,
          permission_ids: updatedIds
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data before submission:', formData);

      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found, please login.');
        return;
      }

      const { user_id, permission_ids } = formData;

      const response = await axios.post(
        'http://localhost:5000/auth/userpermission/assign-permission',
        { userId: user_id, permissionIds: permission_ids },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        setFormData({
          user_id: '',
          permission_ids: []
        });
      } else {
        setErrorMessage(response.data.message || 'Failed to assign permissions.');
        setSuccessMessage('');
      }
      console.log('Form Data after submission:', formData);
    } catch (error) {
      console.error('Error assigning permissions:', error);
      console.log('Response data:', error.response.data); // Log the entire response data
      if (error.response.data.errors && error.response.data.errors.length > 0) {
          const errorMessages = error.response.data.errors.map(error => error.msg).join(', ');
          setErrorMessage(`Failed to assign permissions: ${errorMessages}`);
      } else {
          setErrorMessage(error.response?.data?.message || 'Failed to assign permissions.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign Permissions</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userSelect" className="block font-medium mb-1">User</label>
          <select id="userSelect" name="user_id" value={formData.user_id} onChange={handleChange} className="border rounded px-3 py-2 w-full">
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Permissions</label>
          {permissions.map((permission) => {
            const permissionId = permission.permission_id.toString(); // Ensure it's a string
            return (
              <div key={permissionId} className="mb-2">
                <input
                  type="checkbox"
                  id={permissionId}
                  value={permissionId}
                  onChange={handleChange}
                  checked={formData.permission_ids.includes(permissionId)}
                  className="mr-2"
                />
                <label htmlFor={permissionId}>{permission.permission_name}</label>
              </div>
            );
          })}
        </div>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Assign Permissions</button>
      </form>
    </div>
  );
};

export default AssignPermissionForm;
