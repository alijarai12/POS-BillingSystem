import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/password/reset-password/${token}`);
        setMessage(response.data.message);
        setError('');
      } catch (err) {
        setMessage('');
        setError('Invalid or expired token');
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/password/update-password', {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      setError('');
      // Redirect to login page or home page
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage('');
      setError('Failed to reset password');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
            placeholder="Enter new password"
            required
          />
        </div>
        <button type="submit"
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         >Reset Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPasswordForm;
