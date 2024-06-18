import React from 'react'
import Profile from '../components/Profile';

const ProfilePage = () => {
  return (
    <div className="flex">
    <div className="flex-grow p-8">
      <h1 className="text-3xl font-bold mb-8">Profile </h1>
      <Profile />
    </div>
  </div>
  )
}

export default ProfilePage;