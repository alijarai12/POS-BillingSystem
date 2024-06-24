import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/Profile';

import UserListPage from './pages/UserList';
import TenantListPage from './pages/TenantList';
import TenantFormPage from './pages/TenantForm';

import StaffFormPage from './pages/StaffForm';
import StaffListPage from './pages/StaffList';


import RoleListPage from './pages/RoleList';
import RoleFormPage from './pages/RoleForm';

import PermissionListPage from './pages/PermissionList';
import PermissionFormPage from './pages/PermissionForm';

import AssignedPermissionListPage from './pages/AssignedPermissionList';
import AssignPermissionFormPage from './pages/AssignPermissionForm';

import Home from './pages/Home';
import ProductFormPage from './pages/ProductForm';
import ProductListPage from './pages/ProductList';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Layout from './components/Layout';
import VariantList from './components/VariantList';
import VariantForm from './components/VariantForm';
import BarcodeGenerator from "./components/Barcode"
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BillPage from './pages/BillPage';
import CreateDiscountVariant from './components/CreateDiscount/CreateDiscountVariant';
import CreateDiscount from './components/CreateDiscount/CreateDiscountProduct';
import DiscountList from './pages/DiscountList';
import TaxForm from './components/Taxform';
import TaxList from './pages/TaxList';
import CustomersPage from './pages/CustomersPage';


export default function App() {
  return (
    <Router>
      <Layout>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/create-tax" element={<TaxForm />} />
          <Route path="/tax" element={<TaxList />} />
          <Route path="/create-discount-variant" element={<CreateDiscountVariant />} />
          <Route path="/create-discount-product" element={<CreateDiscount />} />
          <Route path="/discounts" element={<DiscountList />} />
          <Route path="/products" element={<ProductList />} />
         <Route path="/add-product" element={<ProductFormPage />} />
         <Route path="/variants" element={<VariantList/>}/>
         
          <Route path="/barcode" element={<BarcodeGenerator />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/add-products" element={<ProductFormPage />} />
          <Route path="/variants/add-variants" element={<VariantForm />} />
       
          <Route path="/user/user-list" element={<UserListPage />} />
          <Route path="/user/tenant-list" element={<TenantListPage />} />
          <Route path="/tenant/add-tenant" element={<TenantFormPage />} />

          <Route path="/staff/staff-list" element={<StaffListPage />} />
          <Route path="/staff/add-staff" element={<StaffFormPage />} />

          <Route path="/role/role-list" element={<RoleListPage />} />
          <Route path="/role/add-role" element={<RoleFormPage />} />

          <Route path="/permission/permission-list" element={<PermissionListPage />} />
          <Route path="/permission/add-permission" element={<PermissionFormPage />} />

          <Route path="/permission/assigned-permission-list" element={<AssignedPermissionListPage />} />
          <Route path="/permission/assign-permission-to-user" element={<AssignPermissionFormPage />} />

          {/* <Route path="/role-permission/rolepermission-list" element={<RolePermissionListPage />} />
          <Route path="/role-permission/add-rolepermission" element={<RolePermissionFormPage />} /> */}


          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />


        </Routes>
        </CartProvider>
      </Layout>
    </Router>
  );
}
