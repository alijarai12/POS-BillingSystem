import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button, Spacer } from '@nextui-org/react';

const PermissionForm = () => {
  const [permissionName, setPermissionName] = useState('');
  const [permissionDescription, setPermissionDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      const response = await axios.post('http://localhost:5000/auth/permission/', {
        permission_name: permissionName,
        permission_description: permissionDescription
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      setError('');
      setPermissionName('');
      setPermissionDescription('');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Card shadow>
        <p className="text-3xl font-bold text-center text-primary">Create Permission</p>
        <Spacer y={1} />
        <form onSubmit={handleSubmit}>
          <Input
            label="Permission Name"
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)}
            placeholder="Enter permission name"
            required
            fullWidth
          />
          <Spacer y={1} />
          <Input
            label="Permission Description"
            value={permissionDescription}
            onChange={(e) => setPermissionDescription(e.target.value)}
            placeholder="Enter permission description"
            fullWidth
          />
          <Spacer y={1} />
          <Button type="submit" disabled={loading} color="primary" fluid>
            {loading ? 'Creating...' : 'Create Permission'}
          </Button>
        </form>
        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-error text-center">{error}</p>}
      </Card>
    </div>
  );
};

export default PermissionForm;
