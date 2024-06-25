import React from "react";
import ProductList from "../components/ProductList";
const ProductListPage = () => {
  return (
    <div className="flex">
      <div className="flex-grow main-container p-5 min-h-full">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductListPage;
