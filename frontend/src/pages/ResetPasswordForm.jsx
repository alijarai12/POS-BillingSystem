import React from 'react'
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordFormPage = () => {
  return (
    <div className="flex">
        <div className="flex-grow p-8">
          {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
          <ResetPasswordForm />
        </div>
      </div>
  )
}

export default ResetPasswordFormPage