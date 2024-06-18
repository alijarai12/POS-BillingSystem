import React from 'react'
import PermissionForm from '../components/Permissions';

const PermissionFormPage = () => {
  return (
    <div className="flex">
    <div className="flex-grow p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
      <PermissionForm />
    </div>
  </div>
  )
}

export default PermissionFormPage
