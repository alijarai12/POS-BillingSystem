import { useState, useEffect } from 'react';
import axios from 'axios';

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [newPermissionName, setNewPermissionName] = useState('');
  const [newPermissionDescription, setNewPermissionDescription] = useState('');

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/auth/permission/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.permissions) {
          setPermissions(response.data.permissions);
          setError('');
        } else {
          setError('Permissions not found');
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have the necessary permissions');
        } else {
          setError(err.response ? err.response.data.error : 'An error occurred');
        }
        console.error('Error fetching permissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();

    return () => {
      setPermissions([]);
      setError('');
    };
  }, []);

  const handleUpdateClick = (permission) => {
    setSelectedPermission(permission);
    setNewPermissionName(permission.permission_name);
    setNewPermissionDescription(permission.permission_description);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/auth/permission/${selectedPermission.permission_id}`, {
        permission_name: newPermissionName,
        permission_description: newPermissionDescription
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermissions(permissions.map(permission => permission.permission_id === selectedPermission.permission_id ? { ...permission, permission_name: newPermissionName, permission_description: newPermissionDescription } : permission));
      setIsModalOpen(false);
      setSelectedPermission(null);
      setNewPermissionName('');
      setNewPermissionDescription('');
    } catch (error) {
      console.error('Error updating permission:', error);
      setError('Failed to update permission');
    }
  };

  const handleDelete = async (permission_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/auth/permission/${permission_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermissions(permissions.filter(permission => permission.permission_id !== permission_id));
    } catch (error) {
      console.error('Error deleting permission:', error);
      setError('Failed to delete permission');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">Permission List</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!error && permissions.length > 0 ? (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 p-2 border-b font-bold">ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Name</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Description</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(permission => (
              <tr key={permission.permission_id}>
                <td className="p-2 border-b">{permission.permission_id}</td>
                <td className="p-2 border-b">{permission.permission_name}</td>
                <td className="p-2 border-b">{permission.permission_description}</td>
                <td className="p-2 border-b">
                  <button onClick={() => handleUpdateClick(permission)} className="text-blue-600">Update</button>
                  <button onClick={() => handleDelete(permission.permission_id)} className="text-red-600 ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No permissions found</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-bold mb-3">Update Permission</h3>
            <input
              type="text"
              value={newPermissionName}
              onChange={(e) => setNewPermissionName(e.target.value)}
              className="border p-2 w-full mb-3"
              placeholder="Permission Name"
            />
            <textarea
              value={newPermissionDescription}
              onChange={(e) => setNewPermissionDescription(e.target.value)}
              className="border p-2 w-full mb-3"
              placeholder="Permission Description"
            />
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 mr-3">Cancel</button>
              <button onClick={handleUpdateSubmit} className="text-blue-600">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionList;
