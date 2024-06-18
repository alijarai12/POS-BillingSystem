import React from 'react';
import Register from '../components/Register';
const RegisterPage = () => {
 

  return (
    <div className="flex">
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Register </h1>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
