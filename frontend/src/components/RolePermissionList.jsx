import { useState, useEffect } from 'react';
import axios from 'axios';

const RolePermissionList = () => {
  const [rolePermissions, setRolePermissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          return;
        }

        const response = await axios.get('http://localhost:5000/auth/rolepermission/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.rolePermissions) {
          setRolePermissions(response.data.rolePermissions);
          setError('');
        } else {
          setError('Role permissions not found');
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have the necessary permissions');
        } else {
          setError(err.response ? err.response.data.error : 'An error occurred');
        }
        console.error('Error fetching role permissions:', err);
      }
    };

    fetchRolePermissions();

    return () => {
      setRolePermissions([]);
      setError('');
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">Role Permissions List</h2>
      {error && (
        <p className="text-red-600 text-center">{error}</p>
      )}
      {rolePermissions.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-200 py-2">Role ID</th>
              <th className="border-b border-gray-200 py-2">Permission ID</th>
            </tr>
          </thead>
          <tbody>
            {rolePermissions.map((rolePermission, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200 py-2">{rolePermission.role_id}</td>
                <td className="border-b border-gray-200 py-2">{rolePermission.permission_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No role permissions found</p>
      )}
    </div>
  );
};

export default RolePermissionList;
