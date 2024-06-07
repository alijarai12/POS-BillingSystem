import React from 'react'
import TenantList from '../components/TenantList';

const TenantListPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          <TenantList />
        </div>
      </div>
      )
}

export default TenantListPage