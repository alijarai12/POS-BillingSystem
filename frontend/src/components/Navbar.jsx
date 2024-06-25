// import { Link } from "react-router-dom";
// import React from "react";

// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <div className="bg-white text-black p-4 flex justify-between items-center shadow-lg z-20">
//       <button onClick={toggleSidebar} className="lg:hidden">
//         ☰
//       </button>
//       <nav className="hidden lg:flex space-x-4">
//         <Link to="/" className="hover:text-gray-500">
//           Home
//         </Link>
//         <Link to="/products" className="hover:text-gray-500">
//           Products
//         </Link>
//         <Link to="/customers" className="hover:text-gray-500">
//           Customers
//         </Link>
//         <Link to="/sales" className="hover:text-gray-500">
//           Sales
//         </Link>
//         <Link to="/barcode" className="hover:text-gray-500">
//           Barcode
//         </Link>
//       </nav>
//       <div className="hidden lg:flex space-x-4">
//         <Link to="/login" className="hover:text-gray-500">
//           Login
//         </Link>
//         <Link to="/signup" className="hover:text-gray-500">
//           Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };
import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { Input } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { IoIosSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { GrUserSettings } from "react-icons/gr";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoMdAlert } from "react-icons/io";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const items = [
  {
    key: "new",
    label: "New file",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },
];

function Navbar({ OpenSidebar }) {
  return (
    <div className="header z-10 relative">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className=" flex justify-between items-center">
        <div className="p-2 w-[30%]">
          <Input
            startContent={<BsSearch />}
            size="sm"
            placeholder="Search..."
            labelPlacement="outside"
            className="w-full"
          ></Input>
        </div>
        <div className="">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="sm"
                isBordered
                as="button"
                className="transition-transform cursor-pointer	"
              />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem
                key="edit"
                // shortcut="⌘⇧E"
                startContent={<GrUserSettings />}
              >
               My Settings
              </DropdownItem>
              <DropdownItem key="team_settings" startContent={<IoIosSettings />}>Team Settings</DropdownItem>
              <DropdownItem key="analytics" startContent={<IoAnalyticsOutline/>}>Analytics</DropdownItem>
              <DropdownItem key="alert" startContent={<IoMdAlert/>}>Analytics</DropdownItem>

              <DropdownItem
                key="edit"
                // shortcut="⌘⇧E"
                startContent={<IoIosLogOut />}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
