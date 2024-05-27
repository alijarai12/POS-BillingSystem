import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
