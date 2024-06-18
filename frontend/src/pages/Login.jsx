import React from 'react';
import Login from '../components/Login';


const LoginPage = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Login </h1>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage;
