import React from 'react'
import RoleForm from '../components/Roles';

const RoleFormPage = () => {
  return (
    <div className="flex">
    <div className="flex-grow p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
      <RoleForm />
    </div>
  </div>
  )
}

export default RoleFormPage