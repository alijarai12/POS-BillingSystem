import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/auth/staff/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.staff) {
          setStaff(response.data.staff);
          setError('');
        } else {
          setError('Staff not found');
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have the necessary permissions');
        } else {
          setError(err.response ? err.response.data.error : 'An error occurred');
        }
        console.error('Error fetching staff:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();

    return () => {
      setStaff([]);
      setError('');
    };
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 w-4/5 max-w-2xl mx-auto">
      <h3 className="text-blue-600 text-center font-bold">Staff List</h3>
      {error && <p className="text-red-600 text-center">{error}</p>}
      {!error && staff.length > 0 ? (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 p-2 border-b font-bold">ID</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Username</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Email</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((user, index) => (
              <tr key={user.user_id}>
                <td className="p-2 border-b">{user.user_id}</td>
                <td className="p-2 border-b">{user.username}</td>
                <td className="p-2 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No staff found</p>
      )}
    </div>
  );
};

export default StaffList;
