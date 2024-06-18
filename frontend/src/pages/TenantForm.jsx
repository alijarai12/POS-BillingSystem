import React from 'react'
import CreateTenantUserForm from '../components/Tenant';

const TenantFormPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
          <CreateTenantUserForm />
        </div>
      </div>
      )
    }
export default TenantFormPage
