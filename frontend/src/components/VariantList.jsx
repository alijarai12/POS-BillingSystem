import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import JsBarcode from "jsbarcode";

const VariantList = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const barcodeRefs = useRef([]);
  const { addToCart } = useContext(CartContext);

  const fetchVariants = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/variants`);
      setVariants(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch variants");
      console.error("There was an error fetching the variants!", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const handleAddToCart = async (variant) => {
    if (variant.stock > 0) {
      const priceToAdd = variant.discountedPrice
        ? variant.discountedPrice
        : variant.price;

      try {
        // Update stock in the database
        await axios.put(
          `http://localhost:5000/api/variants/${variant.variantId}`,
          {
            stock: variant.stock - 1,
          }
        );

        // Add the variant to the cart
        await addToCart({ ...variant, price: priceToAdd }, 1);

        // Update the local state with the new stock value
        const updatedVariants = variants.map((v) =>
          v.variantId === variant.variantId ? { ...v, stock: v.stock - 1 } : v
        );
        setVariants(updatedVariants);

        // Update local storage with updated stock
        localStorage.setItem("variants", JSON.stringify(updatedVariants));
      } catch (error) {
        console.error("There was an error updating the stock!", error);
      }
    } else {
      alert("Variant out of stock");
    }
  };
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
            <p>Discount price: {variant.discountedPrice}</p>
            <p>Stock: {variant.stock}</p>
            <p>Size: {variant.size}</p>
            <button
              onClick={() => handleAddToCart(variant)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariantList;
