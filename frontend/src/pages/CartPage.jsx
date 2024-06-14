import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./CartModal";
import axios from "axios";

const CartPage = () => {
  const { cart, clearCart, addToCart, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [taxRates, setTaxRates] = useState([]);
  const [includeTax, setIncludeTax] = useState(true);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, [setVariants]);

  useEffect(() => {
    fetchTaxRatesFromServer(); // Fetch tax rates on component mount
    calculateSubtotal();
  }, [cart]);

  const fetchTaxRates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/taxes"); // Adjust the URL to your backend endpoint for fetching tax rates
      return response.data; // Assuming tax rates are returned as an array or object
    } catch (error) {
      console.error("Error fetching tax rates:", error);
      return []; // Return an empty array or handle the error as needed
    }
  };

  const fetchTaxRatesFromServer = async () => {
    const fetchedTaxRates = await fetchTaxRates();
    setTaxRates(fetchedTaxRates);
  };

  const calculateSubtotal = () => {
    let subtotalAmount = 0;
    cart.forEach((item) => {
      subtotalAmount += item.price * item.quantity;
    });
    setSubtotal(subtotalAmount);
    setTotal(subtotalAmount); // In this case, total is the same as subtotal, you can adjust this calculation as needed
  };

  const calculateTaxAmount = () => {
    if (!includeTax) {
      return 0; // Return 0 if tax is excluded
    }

    let taxAmount = 0;
    taxRates.forEach((tax) => {
      if (tax.type === "percentage") {
        taxAmount += (subtotal * tax.rate) / 100;
      } else if (tax.type === "fixed") {
        taxAmount += tax.rate;
      }
    });
    return taxAmount;
  };

  const handleTaxToggle = () => {
    setIncludeTax((prevState) => !prevState);
  };

  const handleClearCart = async () => {
    try {
      // Update the stock for all variants in the cart
      const updatedVariants = variants.map((variant) => {
        const cartItem = cart.find(
          (item) => item.variantId === variant.variantId
        );
        if (cartItem) {
          return { ...variant, stock: variant.stock + cartItem.quantity };
        }
        return variant;
      });

      // Update the stock in the database
      const promises = updatedVariants.map((variant) =>
        axios.put(`http://localhost:5000/api/variants/${variant.variantId}`, {
          stock: variant.stock,
        })
      );
      await Promise.all(promises);

      // Update the local state with the new stock values
      setVariants(updatedVariants);

      // Update local storage with updated stock
      localStorage.setItem("variants", JSON.stringify(updatedVariants));

      // Clear the cart
      clearCart();
    } catch (error) {
      console.error("There was an error updating the stock!", error);
    }
  };
  const handleGenerateBill = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleBillSubmit = async (billData) => {
    setIsLoading(true);
    const tax = calculateTaxAmount();
    const bill = {
      ...billData,
      cartItems: cart,
      subTotal: subtotal,
      tax: includeTax ? tax : 0, // Include tax only if includeTax is true
      totalAmount: includeTax ? total + tax : total, // Include tax in the total amount if includeTax is true
      date: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/api/bills", bill); // Adjust the URL to your backend endpoint
      clearCart();
      setModalVisible(false);
      navigate("/bill");
    } catch (error) {
      console.error("Error generating bill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async (productId, variantId, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        // Find the variant in the local state
        const variant = variants.find((v) => v.variantId === variantId);

        if (variant) {
          // Update stock in the database
          await axios.put(
            `http://localhost:5000/api/variants/${variant.variantId}`,
            {
              stock: variant.stock + 1,
            }
          );

          // Update the local state with the new stock value
          const updatedVariants = variants.map((v) =>
            v.variantId === variantId ? { ...v, stock: v.stock + 1 } : v
          );
          setVariants(updatedVariants);

          // Update local storage with updated stock
          localStorage.setItem("variants", JSON.stringify(updatedVariants));

          // Update the cart quantity
          handleQuantityChange(productId, variantId, -1);
        }
      } catch (error) {
        console.error("There was an error updating the stock!", error);
      }
    }
  };

  const handleIncrement = async (productId, variantId) => {
    try {
      // Find the variant in the local state
      const variant = variants.find((v) => v.variantId === variantId);

      if (variant && variant.stock > 0) {
        // Update stock in the database
        await axios.put(
          `http://localhost:5000/api/variants/${variant.variantId}`,
          {
            stock: variant.stock - 1,
          }
        );

        // Update the local state with the new stock value
        const updatedVariants = variants.map((v) =>
          v.variantId === variantId ? { ...v, stock: v.stock - 1 } : v
        );
        setVariants(updatedVariants);

        // Update local storage with updated stock
        localStorage.setItem("variants", JSON.stringify(updatedVariants));

        // Update the cart quantity
        handleQuantityChange(productId, variantId, 1);
      } else {
        alert("Variant out of stock");
      }
    } catch (error) {
      console.error("There was an error updating the stock!", error);
    }
  };

  const handleRemoveItem = async (productId, variantId) => {
    try {
      // Find the variant in the local state
      const variant = variants.find((v) => v.variantId === variantId);

      if (variant) {
        // Update stock in the database
        await axios.put(
          `http://localhost:5000/api/variants/${variant.variantId}`,
          {
            stock:
              cart.find(
                (item) => item.id === productId && item.variantId === variantId
              ).quantity + variant.stock,
          }
        );

        // Remove the item from the cart
        removeFromCart(productId, variantId);

        // Update the local state with the new stock value
        const updatedVariants = variants.map((v) =>
          v.variantId === variantId ? { ...v, stock: v.stock + 1 } : v
        );
        setVariants(updatedVariants);

        // Update local storage with updated stock
        localStorage.setItem("variants", JSON.stringify(updatedVariants));
      }
    } catch (error) {
      console.error("There was an error updating the stock!", error);
    }
  };

  const handleQuantityChange = (productId, variantId, quantity) => {
    const product = cart.find(
      (item) => item.id === productId && item.variantId === variantId
    );
    if (product) {
      const newQuantity = product.quantity + quantity;
      if (newQuantity > 0) {
        addToCart(product, quantity);
      }
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full mt-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <div className="w-1/3 text-lg font-medium">Product Name</div>
                <div className="w-1/6 text-lg font-medium">Price</div>
                <div className="w-1/6 text-lg font-medium">Quantity</div>
                <div className="w-1/6 text-lg font-medium">Total</div>
                <div className="w-1/6 text-lg font-medium">Actions</div>
              </div>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.variantId}`}
                  className="flex items-center justify-between border-b border-gray-200 py-3"
                >
                  <div className="w-1/3 text-gray-700">{item.name}</div>
                  <div className="w-1/6 text-gray-700">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="w-1/6 flex items-center">
                    <button
                      onClick={() =>
                        handleDecrement(item.id, item.variantId, item.quantity)
                      }
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-l"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id, item.variantId)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-1/6 text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="w-1/6">
                    <button
                      onClick={() => handleRemoveItem(item.id, item.variantId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6">
            <div className="lg:flex lg:w-full lg:justify-between lg:items-center">
              <div className="flex flex-col lg:flex-row lg:items-center mb-4 lg:mb-0">
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 lg:mt-0 lg:mr-4"
                >
                  Clear Cart
                </button>
                <Link to="/variants">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 lg:mt-0 lg:mr-4">
                    Continue Shopping
                  </button>
                </Link>
                <button
                  onClick={handleGenerateBill}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 lg:mt-0"
                >
                  {isLoading ? "Generating Bill..." : "Generate Bill"}
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-right border-t pt-4">
                  <div className="text-lg font-semibold flex justify-between">
                    Order Summary
                  </div>
                  <div className="text-lg font-semibold flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-gray-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-lg font-semibold flex">
                    <span>
                      <input
                        type="checkbox"
                        id="includeTax"
                        checked={includeTax}
                        onChange={handleTaxToggle}
                        className="form-checkbox h-5 w-5 text-blue-500 mr-2"
                      />
                      Tax:
                    </span>
                    <span className="text-gray-800">
                      ${calculateTaxAmount().toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xl font-bold flex justify-between">
                    <span>Total:</span>
                    <span className="text-gray-800">
                      ${(total + calculateTaxAmount()).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleBillSubmit}
      />
    </div>
  );
};
export default CartPage;
