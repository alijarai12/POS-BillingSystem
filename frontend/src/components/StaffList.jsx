import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [updatedStaffData, setUpdatedStaffData] = useState({
    first_name: '',
    email: '',
    contact: '',
    address: '',
    role_id: '',
    is_active: true
  });

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
  }, []);

  const handleUpdateClick = (staffMember) => {
    setSelectedStaff(staffMember);
    setUpdatedStaffData({
      first_name: staffMember.first_name,
      email: staffMember.email,
      contact: staffMember.contact,
      address: staffMember.address,
      role_id: staffMember.role_id,
      is_active: staffMember.is_active
    });
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/auth/staff/${selectedStaff.user_id}`, updatedStaffData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStaff(staff.map(s => s.user_id === selectedStaff.user_id ? { ...s, ...updatedStaffData } : s));
      setIsModalOpen(false);
      setSelectedStaff(null);
      setUpdatedStaffData({
        first_name: '',
        email: '',
        contact: '',
        address: '',
        role_id: '',
        is_active: true
      });
    } catch (error) {
      console.error('Error updating staff:', error);
      setError('Failed to update staff');
    }
  };

  const handleDelete = async (user_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/auth/staff/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStaff(staff.filter(s => s.user_id !== user_id));
    } catch (error) {
      console.error('Error deleting staff:', error);
      setError('Failed to delete staff');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
    setUpdatedStaffData({
      first_name: '',
      email: '',
      contact: '',
      address: '',
      role_id: '',
      is_active: true
    });
  };

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
              <th className="bg-gray-100 p-2 border-b font-bold">Sno.</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Name</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Email</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Contact</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Address</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Role</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Status</th>
              <th className="bg-gray-100 p-2 border-b font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((user, index) => (
              <tr key={user.user_id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{user.first_name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.contact}</td>
                <td className="p-2 border-b">{user.address}</td>
                <td className="p-2 border-b">{user.Role ? user.Role.role_name : 'No role'}</td>
                <td className="p-2 border-b">{user.is_active ? 'Active' : 'Inactive'}</td>
                <td className="p-2 border-b">
                  <button onClick={() => handleUpdateClick(user)} className="text-blue-600">Update</button>
                  <button onClick={() => handleDelete(user.user_id)} className="text-red-600 ml-2">Delete</button>
                </td>
              </tr>
            ))}            
          </tbody>
        </table>
      ) : (
        !error && <p className="text-center">No staff found</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-bold mb-3">Update Staff</h3>
            <input
              type="text"
              value={updatedStaffData.first_name}
              onChange={(e) => setUpdatedStaffData({...updatedStaffData, first_name: e.target.value})}
              className="border p-2 w-full mb-3"
              placeholder="Name"
            />
            <input
              type="email"
              value={updatedStaffData.email}
              onChange={(e) => setUpdatedStaffData({...updatedStaffData, email: e.target.value})}
              className="border p-2 w-full mb-3"
              placeholder="Email"
            />
            <input
              type="text"
              value={updatedStaffData.contact}
              onChange={(e) => setUpdatedStaffData({...updatedStaffData, contact: e.target.value})}
              className="border p-2 w-full mb-3"
              placeholder="Contact"
            />
            <input
              type="text"
              value={updatedStaffData.address}
              onChange={(e) => setUpdatedStaffData({...updatedStaffData, address: e.target.value})}
              className="border p-2 w-full mb-3"
              placeholder="Address"
            />
            <input
              type="text"
              value={updatedStaffData.role_id}
              onChange={(e) => setUpdatedStaffData({...updatedStaffData, role_id: e.target.value})}
              className="border p-2 w-full mb-3"
              placeholder="Role ID"
            />
            <label className="block mb-3">
              <input
                type="checkbox"
                checked={updatedStaffData.is_active}
                onChange={(e) => setUpdatedStaffData({...updatedStaffData, is_active: e.target.checked})}
                className="mr-2"
              />
              Active
            </label>
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

export default StaffList;