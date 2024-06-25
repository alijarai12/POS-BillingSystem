// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Layout = () => {
//   // const [isSidebarOpen, setSidebarOpen] = useState(false);

//   // const toggleSidebar = () => {
//   //   setSidebarOpen(!isSidebarOpen);
//   // };

//   return (
//     // <div className="flex h-screen overflow-hidden">
//     //   <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//     //   <div className="flex flex-col flex-grow relative">
//     //     {/* <Navbar/> */}
//     //     <main className="flex-grow p-4 overflow-auto">
//     //       <Outlet />
//     //     </main>
//     //   </div>
//     // </div>
//     <div className="relative">
//       {" "}
//       <div className="w-full border overflow-hidden relative"><Navbar/> </div>
//       <div className="flex flex-row">
//         {" "}
//         <div className="absolute">
//           <Sidebar />
//         </div>
//         <div className="w-full h-full mt-10">
//           {" "}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Navbar OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

