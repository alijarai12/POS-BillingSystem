import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { UserPermissionsProvider } from "../context/UserPermissionsContext";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <UserPermissionsProvider>
      {" "}
      {/* Wrap the Sidebar component with UserPermissionsProvider */}
      <div className="flex h-screen overflow-hidden">
        {isLoggedIn && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="flex flex-col flex-grow">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-grow p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </UserPermissionsProvider>
  );
};

export default Layout;
