import React from "react";
// import Sidebar from '../components/Sidebar';
import ProductForm from "../components/Products";
const ProductFormPage = () => {
  return (
    <div className="flex">
    <div className="flex-grow p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Add New Product</h1> */}
      <ProductForm />
    </div>
  </div>
     
  );
};

export default ProductFormPage;
