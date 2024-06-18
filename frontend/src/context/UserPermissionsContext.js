import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the context
const UserPermissionsContext = createContext();

// Fetch user permissions function
const fetchUserPermissions = async () => {
  try {
    const response = await axios.get('http://localhost:5000/auth/grant-permission', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure token is included in the request
      }
    });
    return response.data.permissions;
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return [];
  }
};

// Context provider component
export const UserPermissionsProvider = ({ children, permissionName }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Track if the user is superadmin
  const [isStoreAdmin, setIsStoreAdmin] = useState(false); // Track if the user is store

  useEffect(() => {
    const getUserPermissions = async () => {
      try {
        const permissions = await fetchUserPermissions(permissionName); // Pass the permission name
        setUserPermissions(permissions);
        setIsSuperAdmin(Array.isArray(permissions) && permissions.includes('superadmin'));
        setIsStoreAdmin(Array.isArray(permissions) && permissions.includes('store'));
      } catch (error) {
        console.error('Error fetching user permissions:', error);
        // Handle error if needed
      }
    };

    getUserPermissions();
  }, [permissionName]); // Add permissionName as a dependency to re-fetch permissions when it changes

  // Enhanced value to include isSuperAdmin and isStoreAdmin flags
  const contextValue = {
    userPermissions,
    isSuperAdmin,
    isStoreAdmin,
  };

  return (
    <UserPermissionsContext.Provider value={contextValue}>
      {children}
    </UserPermissionsContext.Provider>
  );
};

// Custom hook to use the user permissions context
export const useUserPermissions = () => {
  return useContext(UserPermissionsContext);
};
