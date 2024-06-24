import React, { createContext, useReducer, useEffect } from "react";

// Define action types as constants
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

// Initial state
const initialState = {
  cart: [],
  products: [], // Ensure products are initialized as an empty array
};

// Create context
const CartContext = createContext();

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.variantId === action.payload.variantId
      );

      // Update the stock in the products list
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id &&
        product.variantId === action.payload.variantId
          ? { ...product, stock: product.stock - action.payload.quantity }
          : product
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id &&
            item.variantId === action.payload.variantId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          products: updatedProducts,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
          products: updatedProducts,
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item.id !== action.payload.id ||
            item.variantId !== action.payload.variantId
        ),
        products: state.products.map((product) =>
          product.id === action.payload.id &&
          product.variantId === action.payload.variantId
            ? { ...product, stock: product.stock + action.payload.quantity }
            : product
        ),
      };
    case CLEAR_CART:
      // Reset stock when cart is cleared
      return {
        ...state,
        cart: [],
        products: state.products.map((product) => {
          const cartItem = state.cart.find(
            (item) =>
              item.id === product.id && item.variantId === product.variantId
          );
          return cartItem
            ? { ...product, stock: product.stock + cartItem.quantity }
            : product;
        }),
      };
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize state from local storage if available
  const initialStateFromLocalStorage = JSON.parse(
    localStorage.getItem("cartState")
  );
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    ...initialStateFromLocalStorage,
  });

  useEffect(() => {
    // Update local storage whenever cart or products change
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  const addToCart = (product, quantity) => {
    dispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });
  };

  const removeFromCart = (productId, variantId) => {
    const product = state.cart.find(
      (item) => item.id === productId && item.variantId === variantId
    );
    if (product) {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: { id: productId, variantId, quantity: product.quantity },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        products: state.products,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
