import React from 'react'
import StaffList from '../components/StaffList'


const StaffListPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          <StaffList />
        </div>
      </div>
      )
    }

export default StaffListPage