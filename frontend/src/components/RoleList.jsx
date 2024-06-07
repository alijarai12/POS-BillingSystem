import { useState, useEffect } from 'react';
import axios from 'axios';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/auth/role/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.roles) {
          setRoles(response.data.roles);
          setError('');
        } else {
          setError('Roles not found');
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have the necessary permissions');
        } else {
          setError(err.response ? err.response.data.error : 'An error occurred');
        }
        console.error('Error fetching roles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleUpdateClick = (role) => {
    setSelectedRole(role);
    setNewRoleName(role.role_name);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/auth/role/${selectedRole.role_id}`, {
        role_name: newRoleName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoles(roles.map(role => role.role_id === selectedRole.role_id ? { ...role, role_name: newRoleName } : role));
      setIsModalOpen(false);
      setSelectedRole(null);
      setNewRoleName('');
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Failed to update role');
    }
  };

  const handleDelete = async (role_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/auth/role/${role_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoles(roles.filter(role => role.role_id !== role_id));
    } catch (error) {
      console.error('Error deleting role:', error);
      setError('Failed to delete role');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
    setNewRoleName('');
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 w-4/5 max-w-2xl mx-auto">
      <h3 className="text-blue-600 text-center font-bold">Role List</h3>
      {error && <p className="text-red-600 text-center">{error}</p>}
      {!error && roles.length > 0 ? (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 p-2 border-b font-bold">ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Name</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.role_id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{role.role_name}</td>
                <td className="p-2 border-b">
                  <button onClick={() => handleUpdateClick(role)} className="text-blue-600">Update</button>
                  <button onClick={() => handleDelete(role.role_id)} className="text-red-600 ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No roles found</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-bold mb-3">Update Role</h3>
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-gray-600 mr-3">Cancel</button>
              <button onClick={handleUpdateSubmit} className="text-blue-600">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleList;
