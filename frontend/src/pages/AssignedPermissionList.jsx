import React from 'react'
import AssignedPermissionList from '../components/AssignedPermissionList';

const AssignedPermissionListPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          <AssignedPermissionList />
        </div>
      </div>
      )
    }
export default AssignedPermissionListPage
