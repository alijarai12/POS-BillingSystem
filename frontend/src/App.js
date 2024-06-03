import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductFormPage from './pages/ProductForm';
import ProductListPage from './pages/ProductList';
import ProductDetails from './components/ProductDetails';
import Layout from './components/Layout';
import VariantList from './components/VariantList';
import VariantForm from './components/VariantForm';
import BarcodeGenerator from "./components/Barcode"
import AddBulk from './components/AddBulk';
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/add-product" element={<ProductFormPage />} />
          <Route path="/variants" element={<VariantList />} />
          <Route path="/barcode" element={<BarcodeGenerator />} />

          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/add-products" element={<ProductFormPage />} />
          <Route path="/variants/add-variants" element={<VariantForm />} />
          <Route path="/products/add-bulk" element={<AddBulk />} />

        </Routes>
      </Layout>
    </Router>
  );
}
