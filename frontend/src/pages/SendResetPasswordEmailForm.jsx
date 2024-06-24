import React from 'react'
import SendResetPasswordEmailForm from '../components/SendResetPasswordEmail';

const SendResetPasswordEmailFormPage = () => {
  return (
    <div className="flex">
        <div className="flex-grow p-8">
          {/* <h1 className="text-3xl font-bold mb-8">Role </h1> */}
          <SendResetPasswordEmailForm />
        </div>
      </div>
  )
}

export default SendResetPasswordEmailFormPage