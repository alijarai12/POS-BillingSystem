import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartModal from "./CartModal";

const CartPage = () => {
  const { cart, clearCart, addToCart, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRates, setTaxRates] = useState([]);
  const [includeTax, setIncludeTax] = useState(true);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tenantId, setTenantId] = useState(null); // State for tenant ID

  useEffect(() => {
    const fetchTenantId = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/auth/tenant", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTenantId(response.data.tenantId);
      } catch (error) {
        setError("Failed to fetch tenant ID");
      } finally {
        setLoading(false);
      }
    };

    fetchTenantId();
    fetchVariants();
    fetchTaxRatesFromServer();
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [cart]);

  const fetchVariants = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/variants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVariants(response.data);
    } catch (error) {
      setError("Failed to fetch variants");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaxRatesFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/taxes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTaxRates(response.data);
    } catch (error) {
      console.error("Error fetching tax rates:", error);
    }
  };

  const calculateSubtotal = () => {
    const subtotalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(subtotalAmount);
  };

  const calculateTaxAmount = () => {
    if (!includeTax) return 0;
    return taxRates.reduce((acc, tax) => {
      if (tax.type === "percentage") {
        return acc + (subtotal * tax.rate) / 100;
      } else if (tax.type === "fixed") {
        return acc + tax.rate;
      }
      return acc;
    }, 0);
  };

  const handleTaxToggle = () => setIncludeTax(!includeTax);

  const updateVariantStock = async (variantId, quantity) => {
    const variant = variants.find((v) => v.variantId === variantId);
    if (variant) {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/variants/${variantId}`,
        { stock: variant.stock + quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVariants((prevVariants) =>
        prevVariants.map((v) =>
          v.variantId === variantId ? { ...v, stock: v.stock + quantity } : v
        )
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await Promise.all(
        cart.map((item) => updateVariantStock(item.variantId, item.quantity))
      );
      clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleGenerateBill = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleBillSubmit = async (billData) => {
    setIsLoading(true);
    const tax = calculateTaxAmount();
    const bill = {
      ...billData,
      cartItems: cart,
      subTotal: subtotal,
      tax: includeTax ? tax : 0,
      totalAmount: includeTax ? subtotal + tax : subtotal,
      date: new Date(),
      tenantId: tenantId, // Adding the tenant ID to the bill data
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/bills", bill, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      clearCart();
      setModalVisible(false);
      navigate("/bill", { state: { fromCart: true } });
    } catch (error) {
      console.error("Error generating bill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity > 1) {
      await updateVariantStock(item.variantId, 1);
      addToCart(item, -1);
    }
  };

  const handleIncrement = async (item) => {
    const variant = variants.find((v) => v.variantId === item.variantId);
    if (variant && variant.stock > 0) {
      await updateVariantStock(item.variantId, -1);
      addToCart(item, 1);
    } else {
      alert("Variant out of stock");
    }
  };

  const handleRemoveItem = async (item) => {
    await updateVariantStock(item.variantId, item.quantity);
    removeFromCart(item.id, item.variantId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                      onClick={() => handleDecrement(item)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-l"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item)}
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
                      onClick={() => handleRemoveItem(item)}
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
                <div className="text-right border-t pt  border-gray-200">
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
                      ${(subtotal + calculateTaxAmount()).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <CartModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleBillSubmit}
      />
    </div>
  );
};

export default CartPage;
