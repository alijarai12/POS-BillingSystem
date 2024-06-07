// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBox, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const Sidebar = () => {
//   const [isProductsOpen, setProductsOpen] = useState(false);

//   const toggleProducts = () => {
//     setProductsOpen(!isProductsOpen);
//   };

//   return (
//     <div className=" bg-purple-500 text-white w-64 p-4">
//       <h2 className="text-3xl font-bold mb-6">Navigation</h2>
//       <ul className="space-y-4">
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
//                 <Link to="/products/category1" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Category 1</Link>
//               </li>
//               <li>
//                 <Link to="/products/category2" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Category 2</Link>
//               </li>
//               <li>
//                 <Link to="/products/category3" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Category 3</Link>
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaChevronDown, FaChevronUp, FaUsers, FaBarcode, FaUnlock, FaUserTie, FaDollarSign } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);
  const [isStaffsOpen, setStaffsOpen] = useState(false);
  const [isRolesOpen, setRolesOpen] = useState(false);
  const [isPermissionsOpen, setPermissionsOpen] = useState(false);
  const [isRolePermissionsOpen, setRolePermissionsOpen] = useState(false);
  const [isSalesOpen, setSalesOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const toggleUsers = () => {
    setUsersOpen(!isUsersOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const toggleStaffs = () => {
    setStaffsOpen(!isStaffsOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const toggleRoles = () => {
    setRolesOpen(!isRolesOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const togglePermissions = () => {
    setPermissionsOpen(!isPermissionsOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const toggleRolePermissions = () => {
    setRolePermissionsOpen(!isRolePermissionsOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  const toggleSales = () => {
    setSalesOpen(!isSalesOpen);
    if (!isOpen) toggleSidebar(); // Open sidebar if closed
  };

  return (
    <div
      className={` top-0 left-0 z-30 w-64 bg-gray-900 text-white transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 mb-6">
        <h2 className="text-3xl font-bold">MyApp</h2>
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          X
        </button>
      </div>
      <div className="mb-4 px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      <ul className="space-y-4 px-4">
        <li className="group">
          <button
            onClick={toggleProducts}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaBox className="mr-3" />
              Products
            </span>
            {isProductsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isProductsOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/products" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Product List</Link>
              </li>
              <li>
                <Link to="/variants" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Variants</Link>
              </li>
              <li>
                <Link to="/products/add-products" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Product</Link>
              </li>
              <li>
                <Link to="/variants/add-variants" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Variants</Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="group">
          <button
            onClick={toggleUsers}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaUsers className="mr-3" />
              Users
            </span>
            {isUsersOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isUsersOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/user/user-list" className="block py-2 px-4 bg-gray-800 rounded-md huser/user-listover:bg-gray-700 transition duration-300">User List</Link>
              </li>
              <li>
                <Link to="/user/tenant-list" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Tenant List</Link>
              </li>
              <li>
                <Link to="/tenant/add-tenant" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Tenent</Link>
              </li>
              <li>
                {/* <Link to="/variants/add-variants" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Variants</Link> */}
              </li>
            </ul>
          )}
        </li>

        <li className="group">
          <button
            onClick={toggleStaffs}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaUsers className="mr-3" />
              Staff
            </span>
            {isStaffsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isStaffsOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/staff/staff-list" className="block py-2 px-4 bg-gray-800 rounded-md huser/user-listover:bg-gray-700 transition duration-300">Staff List</Link>
              </li>
              <li>
                {/* <Link to="/variants" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Variants</Link> */}
              </li>
              <li>
                <Link to="/staff/add-staff" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Staff</Link>
              </li>
              <li>
                {/* <Link to="/variants/add-variants" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Variants</Link> */}
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/customers" className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">
            <FaUsers className="mr-3" />
            Customers
          </Link>
        </li>

        <li className="group">
          <button
            onClick={toggleRoles}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaUserTie className="mr-3" />
              Roles
            </span>
            {isRolesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isRolesOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/role/role-list" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Role List</Link>
              </li>
              {/* <li>
                <Link to="/variants" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Variants</Link>
              </li>
              <li>
                <Link to="/products/add-products" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Product</Link>
              </li> */}
              <li>
                <Link to="/role/add-role" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Role</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="group">
          <button
            onClick={togglePermissions}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaUnlock className="mr-3" />
              Permission
            </span>
            {isPermissionsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isPermissionsOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/permission/permission-list" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Permission List</Link>
              </li>
              <li>
                <Link to="/permission/add-permission" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Add Permission</Link>
              </li>
              
            </ul>
          )}
        </li>

        <li className="group">
          <button
            onClick={toggleRolePermissions}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaUnlock className="mr-3" />
             Assigned Permission
            </span>
            {isRolePermissionsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isRolePermissionsOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/permission/assigned-permission-list" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Assigned-Permission List</Link>
              </li>
              <li>
              <Link to="/permission/assign-permission-to-user" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Assign-Permission-Form</Link>
              </li>             
            </ul>
          )}
        </li>


        {/* <li>
          <Link to="/customers" className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">
            <FaUnlock className="mr-3" />
            Permission
          </Link>
        </li> */}

        <li>
          <Link to="/barcode" className="flex items-center py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">
            <FaBarcode className="mr-3" />
            Barcode
            </Link>
        </li>
        <li className="group">
          <button
            onClick={toggleSales}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            <span className="flex items-center">
              <FaDollarSign className="mr-3" />
              Sales
            </span>
            {isSalesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isSalesOpen && (
            <ul className="mt-2 space-y-2 ml-6">
              <li>
                <Link to="/sales" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Sales List</Link>
              </li>
              <li>
                <Link to="/sales/reports" className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300">Sales Reports</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
