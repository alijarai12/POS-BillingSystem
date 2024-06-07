import { useState, useEffect } from 'react';
import axios from 'axios';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/auth/tenant/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.tenant) {
          setTenants(response.data.tenant);
          setError('');
        } else {
          setError('Tenants not found');
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have the necessary permissions');
        } else {
          setError(err.response ? err.response.data.error : 'An error occurred');
        }
        console.error('Error fetching tenants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();

    return () => {
      setTenants([]);
      setError('');
    };
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 w-4/5 max-w-2xl mx-auto">
      <h3 className="text-blue-600 text-center font-bold">Tenant List</h3>
      {error && <p className="text-red-600 text-center">{error}</p>}
      {!error && tenants.length > 0 ? (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 p-2 border-b font-bold">ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Name</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={tenant.id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{tenant.fullname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No tenants found</p>
      )}
    </div>
  );
};

export default TenantList;
