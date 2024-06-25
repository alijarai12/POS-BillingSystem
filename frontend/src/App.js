import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductFormPage from "./pages/ProductForm";
import ProductListPage from "./pages/ProductList";
import ProductDetails from "./components/ProductDetails";
import Layout from "./components/Layout";
import VariantList from "./components/VariantList";
import VariantForm from "./components/VariantForm";
import BarcodeGenerator from "./components/Barcode";
import AddBulk from "./components/AddBulk";
import Expenses from "./components/Expenses";
import SalesTransaction from "./components/SalesReport";
import InventoryReport from "./components/InventoryReport";
import Linegraph from "./components/Linegraph";
import HomePage from "./pages/HomePage";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/variants" element={<VariantList />} />
          <Route path="/barcode" element={<BarcodeGenerator />} />
          <Route path="/graph" element={<Linegraph />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/sales-report" element={<SalesTransaction />} />
          <Route path="/inventory-report" element={<InventoryReport />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/add-products" element={<ProductFormPage />} />
          <Route path="/variants/add-variants" element={<VariantForm />} />
          <Route path="/products/add-bulk" element={<AddBulk />} />
        </Route>
      </Routes>
    </Router>
  );
}
