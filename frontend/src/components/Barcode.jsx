import React, { useState } from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [scannedBarcode, setScannedBarcode] = useState('');

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const generateBarcode = () => {
    const barcodeData = selectedOptions.join('-');
    return <Barcode value={barcodeData} />;
  };

  const handleBarcodeScanned = (scannedData) => {
    // Simulate accessing database based on scanned barcode
    // Replace this with your actual database access logic
    const productData = getProductDataFromDatabase(scannedData);
    console.log('Product data:', productData);
  };

  const getProductDataFromDatabase = (barcode) => {
    // This is a mock function, replace it with your actual database access code
    // Here you can make a request to your backend API to fetch product data based on the scanned barcode
    // For demonstration purposes, we'll return a mock product data object
    return {
      name: 'Product Name',
      price: '$19.99',
      description: 'Product description goes here...',
    };
  };

  return (
    <div>
      <select multiple onChange={handleSelectChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <button onClick={generateBarcode}>Generate Barcode</button>
      {selectedOptions.length > 0 && generateBarcode()}

      {/* Simulated barcode scanner */}
      <div>
        <label>Scan Barcode:</label>
        <input
          type="text"
          value={scannedBarcode}
          onChange={(e) => setScannedBarcode(e.target.value)}
          onBlur={() => handleBarcodeScanned(scannedBarcode)}
        />
      </div>
    </div>
  );
};

export default BarcodeGenerator;
