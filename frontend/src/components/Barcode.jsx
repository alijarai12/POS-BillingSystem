
import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import Barcode from "react-barcode";

const BarcodeGenerator = () => {
  const printRef = useRef();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    { name: "Product 1", code: "123456789012", stock: 5 },
    { name: "Product 2", code: "987654321098", stock: 2 },
    { name: "Product 3", code: "543210987654", stock: 10 },
    // Add more products as needed
  ];

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((p) => p !== product);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  return (
    <div>
      <h1>Product Barcodes</h1>

      <div style={{ marginBottom: "20px" }}>
        {products.map((product) => (
          <div key={product.code}>
            <label>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleCheckboxChange(product)}
              />
              {product.name} (Stock: {product.stock})
            </label>
          </div>
        ))}
      </div>

      <ReactToPrint
        trigger={() => <button>Print Barcodes</button>}
        content={() => printRef.current}
      />

      <div ref={printRef}>
        {selectedProducts.map((product) => (
          <div key={product.code} style={{ marginBottom: "20px" }}>
            <h3>
              {product.name} (Stock: {product.stock})
            </h3>
            <Barcode value={product.code} width={1} height={40} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarcodeGenerator;
