// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBox,
//   FaChevronDown,
//   FaChevronUp,
//   FaUsers,
//   FaBarcode,
//   FaDollarSign,
// } from "react-icons/fa";
// import { MdInventory2 } from "react-icons/md";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [isProductsOpen, setProductsOpen] = useState(false);
//   const [isSalesOpen, setSalesOpen] = useState(false);

//   const toggleProducts = () => {
//     setProductsOpen(!isProductsOpen);
//     if (!isOpen) toggleSidebar(); // Open sidebar if closed
//   };

//   const toggleSales = () => {
//     setSalesOpen(!isSalesOpen);
//     if (!isOpen) toggleSidebar(); // Open sidebar if closed
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 z-30 min-h-full h-full w-64 bg-white text-black transition-transform duration-300 transform overflow-y-auto ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0`}
//     >
//       <div className="flex items-center justify-between p-4 mb-6">
//         <h2 className="text-3xl font-bold">MyApp</h2>
//         <button onClick={toggleSidebar} className="lg:hidden text-white">
//           X
//         </button>
//       </div>
//       <div className="mb-4 px-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
//         />
//       </div>
//       <ul className="space-y-4 px-4">
//         <li className="group">
//           <button
//             onClick={toggleProducts}
//             className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//           >
//             <span className="flex items-center">
//               <FaBox className="mr-3" />
//               Products
//             </span>
//             {isProductsOpen ? <FaChevronUp /> : <FaChevronDown />}
//           </button>
//           {isProductsOpen && (
//             <ul className="mt-2 space-y-2 ml-6">
//               <li>
//                 <Link
//                   to="/products"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Product List
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/variants"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Variants
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/products/add-products"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Add Product
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/variants/add-variants"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Add Variants
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/products/add-bulk"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Add Bulk Products
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>
//         <li>
//           <Link
//             to="/customers"
//             className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//           >
//             <FaUsers className="mr-3" />
//             Customers
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/expenses"
//             className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//           >
//             <GiExpense className="mr-3" />
//             Expenses
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/inventory-report"
//             className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//           >
//             <MdInventory2 className="mr-3" />
//             Inventory
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/barcode"
//             className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//           >
//             <FaBarcode className="mr-3" />
//             Barcode{" "}
//           </Link>
//         </li>
//         <li className="group">
//           <button
//             onClick={toggleSales}
//             className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//           >
//             <span className="flex items-center">
//               <FaDollarSign className="mr-3" />
//               Sales
//             </span>
//             {isSalesOpen ? <FaChevronUp /> : <FaChevronDown />}
//           </button>
//           {isSalesOpen && (
//             <ul className="mt-2 space-y-2 ml-6">
//               <li>
//                 <Link
//                   to="/sales"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Sales List
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/sales/sales-report"
//                   className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
//                 >
//                   Sales Reports
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiExpense } from "react-icons/gi";

import {
  FaBox,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaBarcode,
  FaDollarSign,
  FaRegCreditCard
} from "react-icons/fa";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [openItems, setOpenItems] = useState({});


  const handleToggle = (item) => {
    setOpenItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item cursor-pointer">
          <Link to="/dashboard">
            <span className="sidebar-item-content text-black">
              <BsGrid1X2Fill className="icon" /> Dashboard
            </span>
          </Link>
        </li>
        <li className="sidebar-list-item cursor-pointer">
          <div onClick={() => handleToggle('products')}>
            <Link to="/products">
            <span className="sidebar-item-content text-black">
              <BsFillArchiveFill className="icon" /> Products
            </span></Link>
          </div>
          {/* {openItems.products && (
            <ul className="dropdown-content">
              <li>
                <Link to="/products/product1">Product 1</Link>
              </li>
              <li>
                <Link to="/products/product2">Product 2</Link>
              </li>
              <li>
                <Link to="/products/product3">Product 3</Link>
              </li>
            </ul>
          )} */}
        </li>
        <li className="sidebar-list-item">
          <Link to="/expenses">
            <span className="sidebar-item-content text-black">
              <GiExpense className="icon" /> Expenses
            </span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/customers">
            <span className="sidebar-item-content text-black">
              <BsPeopleFill className="icon" /> Customers
            </span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/inventory-report">
            <span className="sidebar-item-content text-black">
              <BsListCheck className="icon" /> Inventory
            </span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/sales-report">
            <span className="sidebar-item-content text-black">
              <FaRegCreditCard className="icon" /> Sales
            </span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <div onClick={() => handleToggle('reports')}>
            <span className="sidebar-item-content text-black">
              <BsMenuButtonWideFill className="icon" /> Bills
            </span>
          </div>
          {/* {openItems.reports && (
            <ul className="dropdown-content">
              <li>
                <Link to="/reports/report1">Report 1</Link>
              </li>
              <li>
                <Link to="/reports/report2">Report 2</Link>
              </li>
              <li>
                <Link to="/reports/report3">Report 3</Link>
              </li>
            </ul>
          )} */}
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings">
            <span className="sidebar-item-content text-black">
              <BsFillGearFill className="icon" /> Setting
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
