import { useState, useEffect } from 'react';
import axios from 'axios';

const AssignedPermissionList = () => {
  const [assignedPermissions, setAssignedPermissions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [newPermissionName, setNewPermissionName] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [newPermissionId, setNewPermissionId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Effect to fetch assigned permissions, users, and permissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        // Fetch assigned permissions
        const assignedResponse = await axios.get('http://localhost:5000/auth/userpermission/assigned-permissions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch users
        const usersResponse = await axios.get('http://localhost:5000/auth/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch permissions
        const permissionsResponse = await axios.get('http://localhost:5000/auth/permission/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update states
        if (Array.isArray(assignedResponse.data) && Array.isArray(usersResponse.data) && permissionsResponse.data.permissions) {
          setAssignedPermissions(assignedResponse.data);
          setUsers(usersResponse.data);
          setPermissions(permissionsResponse.data.permissions);
          setError('');
        } else {
          setError('Data not found');
        }
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle update click
  const handleUpdateClick = (permission) => {
    setSelectedPermission(permission);
    setNewPermissionName(permission.Permission.permission_name);
    setNewUserId(permission.User.user_id);
    setNewPermissionId(permission.Permission.permission_id);
    setIsModalOpen(true);
    setSuccessMessage(''); // Reset success message
  };

  // Function to handle update form submit
  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/auth/userpermission/${selectedPermission.user_permission_id}`, {
        user_id: newUserId,
        permission_id: newPermissionId,
        permission_name: newPermissionName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update assignedPermissions state
      setAssignedPermissions(prevPermissions => {
        return prevPermissions.map(perm =>
          perm.user_permission_id === selectedPermission.user_permission_id
            ? { ...perm, Permission: { ...perm.Permission, permission_name: newPermissionName } }
            : perm
        );
      });

      setIsModalOpen(false);
      setSelectedPermission(null);
      setNewPermissionName('');
      setSuccessMessage('Permission updated successfully.'); // Display success message
      console.log('Success message:', successMessage);

    } catch (error) {
      console.error('Error updating permission:', error);
      setError('Failed to update permission');
    }
  };

  // Function to handle delete
  const handleDelete = async (user_permission_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/auth/userpermission/${user_permission_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAssignedPermissions(prevPermissions => prevPermissions.filter(permission => permission.user_permission_id !== user_permission_id));
    } catch (error) {
      console.error('Error deleting permission:', error);
      setError('Failed to delete permission');
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPermission(null);
    setNewPermissionName('');
    setSuccessMessage(''); // Reset success message
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">Assigned Permissions</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!error && assignedPermissions.length > 0 ? (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 p-2 border-b font-bold">User ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Username</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Permission ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Permission Name</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Permission Description</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedPermissions.map(({ user_permission_id, User, Permission }) => (
              <tr key={user_permission_id}>
                <td className="p-2 border-b">{User.user_id}</td>
                <td className="p-2 border-b">{User.username}</td>
                <td className="p-2 border-b">{Permission.permission_id}</td>
                <td className="p-2 border-b">{Permission.permission_name}</td>
                <td className="p-2 border-b">{Permission.permission_description}</td>
                <td className="p-2 border-b">
                  <button className="text-blue-600" onClick={() => handleUpdateClick({ user_permission_id, User, Permission })}>Update</button>
                  <button className="text-red-600 ml-2" onClick={() => handleDelete(user_permission_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No user permissions found</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Update Permission</h2>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>} {/* Display success message */}
           
            <div className="mb-4">
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID:</label>
              <select
                id="userId"
                name="userId"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="permissionId" className="block text-sm font-medium text-gray-700">Permission ID:</label>
              <select
                id="permissionId"
                name="permissionId"
                value={newPermissionId}
                onChange={(e) => setNewPermissionId(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                {permissions.map(permission => (
                  <option key={permission.permission_id} value={permission.permission_id}>
                    {permission.permission_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2">Cancel</button>
              <button onClick={handleUpdateSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedPermissionList;