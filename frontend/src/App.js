import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductFormPage from './pages/ProductForm';
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
          <Route path="/variants" element={<VariantList />} />
          <Route path="/barcode" element={<BarcodeGenerator />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/add-products" element={<ProductFormPage />} />
          <Route path="/variants/add-variants" element={<VariantForm />} />
       </Routes>
       </CartProvider>
      </Layout>
    </Router>
  );
}
