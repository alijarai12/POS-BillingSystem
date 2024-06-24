import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileInput from './FileInput';
import { Input, Button, Card } from '@nextui-org/react';

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    address: '',
    contact: '',
    profile_image: null,
    profile_image_preview: '',
    email: '',
    role_id: '',
  });
  const [roles, setRoles] = useState([]);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/auth/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Profile data:', response.data); // Log the entire response data

        // Check if profile_image is present and convert it to a Blob URL
        if (response.data.profile_image && response.data.profile_image.data) {
          console.log('Profile image buffer found.');
          const arrayBuffer = new Uint8Array(response.data.profile_image.data).buffer;
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Adjust the type as needed
          const imageUrl = URL.createObjectURL(blob);

          setProfile({
            ...response.data,
            profile_image: blob,
            profile_image_preview: imageUrl,
          });
        } else {
          console.log('No profile image buffer found.');
          setProfile(response.data);
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRolesAndTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        const [roleResponse] = await Promise.all([
          axios.get('http://localhost:5000/auth/role/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);

        setRoles(roleResponse.data.roles || []);
      } catch (err) {
        console.error('Fetch roles error:', err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchProfile();
    fetchRolesAndTenants();
  }, []);


  const getRoleName = (roleId) => {
    const role = roles.find(role => role.role_id === roleId);
    return role ? role.role_name : 'Null';
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleFileChange = (file) => {
    console.log('Selected file:', file);

    setProfile({
      ...profile,
      profile_image: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prevState => ({
          ...prevState,
          profile_image_preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('first_name', profile.first_name);
    formData.append('last_name', profile.last_name);
    formData.append('address', profile.address);
    formData.append('contact', profile.contact);
    formData.append('email', profile.email);

    if (password) {
      formData.append('password', password);
    }

    if (profile.profile_image) {
      formData.append('profile_image', profile.profile_image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/auth/user/profile', 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMessage(response.data.message);
      setPassword(''); // Clear password field after update
      
      const updatedProfile = response.data;
      console.log('Updated profile data:', updatedProfile);

      if (updatedProfile.profile_image && updatedProfile.profile_image.data) {
        console.log('Updated profile image buffer found.');
        const arrayBuffer = new Uint8Array(updatedProfile.profile_image.data).buffer;
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Adjust the type as needed
        const imageUrl = URL.createObjectURL(blob);

        setProfile({
          ...updatedProfile,
          profile_image: blob,
          profile_image_preview: imageUrl,
        });
      } else {
        setProfile(updatedProfile);
      }

    } catch (err) {
      console.error('Error response:', err.response); // Log the error response
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            clearable
            bordered
            fullWidth
            label="First Name"
            name="first_name"
            onChange={handleChange}
            value={profile.first_name}
          />

          <Input
            clearable
            bordered
            fullWidth
            label="Last Name"
            name="last_name"
            onChange={handleChange}
            value={profile.last_name}
          />

          <Input  
            clearable
            bordered
            fullWidth
            label="Contact"
            name="contact"
            onChange={handleChange}
            value={profile.contact}
          />

          <Input
            clearable
            bordered
            fullWidth
            label="Address"
            name="address"
            onChange={handleChange}
            value={profile.address}
          />

          <FileInput
            label="Profile Image"
            name="profile_image"
            onChange={handleFileChange}
            accept="image/*"
            className="mb-4"
            initialFileName={profile.profile_image_preview || ''} 

          />

          {profile.profile_image_preview && (
            <img src={profile.profile_image_preview} alt="Profile Preview" className="rounded-full h-24 w-24 object-cover mx-auto" />
          )}

          <Input
            clearable
            underlined
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="*************"
          />

          <Input
            clearable
            underlined
            fullWidth
            label="Role"
            name="role_id"
            value={getRoleName(profile.role_id)}
            readOnly
          />
          
          <Button type="submit" className="mt-2" color="primary" auto>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
