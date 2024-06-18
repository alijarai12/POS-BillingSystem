import React from 'react'
import StaffForm from '../components/Staff';

const StaffFormPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
          <StaffForm />
        </div>
      </div>
      )
    }
export default StaffFormPage
