import { useState } from 'react';
import axios from 'axios';

const RolePermissionForm = () => {
  const [formData, setFormData] = useState({
    role_id: '',
    permission_id: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/rolepermission/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage(response.data.message);
      setError('');
      setFormData({ role_id: '', permission_id: '' });
    } catch (err) {
      console.error('Error creating role-permission association:', err);
      setError(err.response ? err.response.data.error : 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">Create Role-Permission Association</h2>
      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="role_id" className="block mb-1">Role ID</label>
          <input type="text" id="role_id" name="role_id" value={formData.role_id} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="permission_id" className="block mb-1">Permission ID</label>
          <input type="text" id="permission_id" name="permission_id" value={formData.permission_id} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">Create</button>
      </form>
    </div>
  );
};

export default RolePermissionForm;
