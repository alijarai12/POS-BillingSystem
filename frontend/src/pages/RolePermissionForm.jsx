import React from 'react'
import RolePermissionForm from '../components/RolePermission';

const RolePermissionFormPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
          <RolePermissionForm />
        </div>
      </div>
      )
    }

export default RolePermissionFormPage