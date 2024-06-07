import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import JsBarcode from 'jsbarcode';

const VariantList = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const barcodeRefs = useRef([]);

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/variants`);
      setVariants(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch variants');
      console.error('There was an error fetching the variants!', error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   variants.forEach((variant, index) => {
  //     generateBarcode(variant.barcode, index);
  //   });
  // }, [variants]);

  // const generateBarcode = (barcodeValue, index) => {
  //   if (barcodeRefs.current[index]) {
  //     JsBarcode(barcodeRefs.current[index], barcodeValue, {
  //       format: 'CODE128',
  //     });
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Variants</h2>
      <ul>
        {variants.map((variant, index) => (
          <li key={variant.variantId} className="mb-4">
            <p>Name: {variant.name}</p>
            <p>Value: {variant.value}</p>
            <p>SKU: {variant.SKU}</p>
            <p>Price: ${variant.price}</p>
            <p>Stock: {variant.stock}</p>
            <p>Size:{variant.size}</p>
            {/* <svg
              ref={(ref) => (barcodeRefs.current[index] = ref)}
              className="barcode"
            ></svg> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariantList;
