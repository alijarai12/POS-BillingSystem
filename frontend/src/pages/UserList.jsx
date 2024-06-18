import React from 'react'
import UserList from '../components/UserList';

const UserListPage = () => {
    return (
        <div className="flex">
        <div className="flex-grow p-8">
          <UserList />
        </div>
      </div>
      )
    }

export default UserListPage