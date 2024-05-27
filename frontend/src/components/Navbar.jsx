// import React from "react";
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

// export default function Nav() {
//   return (
//     <Navbar shouldHideOnScroll>
//       <NavbarBrand>
//         <p className="font-semibold text-inherit text-2xl"><span className="text-purple-600	">POS</span>Biling</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="/products">
//             Products
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="#" aria-current="page">
//             Customers
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Integrations
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex">
//           <Link href="#">Login</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             Sign Up
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }

// import { React } from 'react';
// import { Button } from '@nextui-org/react';

// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
//       <div className="text-xl font-bold">MyApp</div>
//       <Button
//         auto
//         flat
//         color="primary"
//         onClick={toggleSidebar}
//         className="lg:hidden"
//       >
//         Menu
//       </Button>
//       <ul className="hidden lg:flex space-x-4">
//         <li><a href="#" className="hover:text-gray-300 transition duration-300">Home</a></li>
//         <li><a href="#" className="hover:text-gray-300 transition duration-300">About</a></li>
//         <li><a href="#" className="hover:text-gray-300 transition duration-300">Services</a></li>
//         <li><a href="#" className="hover:text-gray-300 transition duration-300">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="lg:hidden">
        ☰
      </button>
      <h1 className="text-2xl">MyApp</h1>
      <nav className="hidden lg:flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/products" className="hover:text-gray-300">Products</Link>
        <Link to="/customers" className="hover:text-gray-300">Customers</Link>
        <Link to="/sales" className="hover:text-gray-300">Sales</Link>
        <Link to="/barcode" className="hover:text-gray-300">Barcode</Link>
      </nav>
      <div className="hidden lg:flex space-x-4">
        <Link to="/login" className="hover:text-gray-300">Login</Link>
        <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
      </div>
    </header>
  );
};

export default Navbar;
