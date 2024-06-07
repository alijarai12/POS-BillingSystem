// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Authentication token not found');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/auth/user/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(response.data);
//         setError('');
//       } catch (err) {
//         if (err.response && err.response.status === 403) {
//           setError('Forbidden: You do not have the necessary permissions');
//         } 
      
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();

//     return () => {
//       setUsers([]);
//       setError('');
//     };
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   // if (error) {
//   //   return <div className="text-center text-red-500">{error}</div>;
//   // }

//   return (
//     <div className="bg-white rounded-lg shadow p-5 w-4/5 max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold mb-4 text-center text-primary">User List</h2>
//       {error && (
//         <p className="text-red-600 text-center">{error}</p>
//       )}
//       {!error && users.length > 0 && (
//         <table className="w-full border-collapse mt-5">
//           <thead>
//             <tr>
//               <th className="bg-gray-100 p-2 border-b font-bold">ID</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Username</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Email</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Active</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Role ID</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Tenant ID</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Created At</th>
//               <th className="bg-gray-100 p-2 border-b font-bold">Updated At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user.user_id}>
//                 <td className="p-2 border-b">{index + 1}</td>
//                 <td className="p-2 border-b">{user.username}</td>
//                 <td className="p-2 border-b">{user.email}</td>
//                 <td className="p-2 border-b">{user.is_active ? 'Yes' : 'No'}</td>
//                 <td className="p-2 border-b">{user.role_id}</td>
//                 <td className="p-2 border-b">{user.tenant_id ?? 'N/A'}</td>
//                 <td className="p-2 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
//                 <td className="p-2 border-b">{new Date(user.updatedAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserList;


import { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const [userResponse, roleResponse, tenantResponse] = await Promise.all([
          axios.get('http://localhost:5000/auth/user/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/auth/role/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/auth/tenant/', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        console.log('Users:', userResponse.data);
        console.log('Roles:', roleResponse.data);
        console.log('Tenants:', tenantResponse.data);

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

        setUsers(userResponse.data);
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have the necessary permissions');
        } else {
          setError('An error occurred while fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setUsers([]);
      setRoles([]);
      setTenants([]);
      setError('');
    };
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const getRoleName = (roleId) => {
    const role = roles.find(role => role.role_id === roleId);
    return role ? role.role_name : 'Unknown Role';
  };

  const getTenantName = (tenantId) => {
    const tenant = tenants.find(tenant => tenant.tenant_id === tenantId);
    return tenant ? tenant.fullname : 'Null';
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 w-4/5 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">User List</h2>
      {error && (
        <p className="text-red-600 text-center">{error}</p>
      )}
      {!error && users.length > 0 && (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 p-2 border-b font-bold">ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Username</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Email</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Active</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Role</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Tenant</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Created At</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{user.username}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.is_active ? 'Yes' : 'No'}</td>
                <td className="p-2 border-b">{getRoleName(user.role_id)}</td>
                <td className="p-2 border-b">{getTenantName(user.tenant_id) ?? 'N/A'}</td>
                <td className="p-2 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border-b">{new Date(user.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
