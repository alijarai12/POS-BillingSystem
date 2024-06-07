import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard </h1>
        <Dashboard />
      </div>
    </div>
  )
}

export default DashboardPage;
