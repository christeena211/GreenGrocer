// src/context/ItemContext.js

import React, { createContext, useState } from "react";

export const itemContext = createContext();

// creating custom provider
const CustomItemContext = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    const isAlreadyInCart = items.find((item) => item._id === product._id);
    if (isAlreadyInCart) {
      setItems(
        items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const isAlreadyInCart = items.find((item) => item._id === product._id);
    if (isAlreadyInCart && isAlreadyInCart.quantity === 1) {
      setItems(items.filter((item) => item._id !== product._id));
    } else if (isAlreadyInCart) {
      setItems(
        items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const getItemsCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Add updateQuantity function
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems(
      items.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  return (
    // default provider
    <itemContext.Provider
      value={{
        addToCart,
        removeFromCart,
        updateQuantity,
        items,
        itemsInCart: getItemsCount(),
        totalPrice: getTotalPrice(),
      }}
    >
      {children}
    </itemContext.Provider>
  );
};
export default CustomItemContext;
