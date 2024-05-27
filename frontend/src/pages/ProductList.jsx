import React from 'react';
import ProductList from '../components/ProductList';
const ProductListPage = () => {
 

  return (
    <div className="flex">
      <div className="flex-grow p-8">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductListPage;
