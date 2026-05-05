import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.product_id === product.product_id);
      
      if (existingItem) {
        return prev.map(item => 
          item.product_id === product.product_id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setIsCartOpen(true);
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.product_id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // CHANGED: Wrapped the logic in a function called getCartTotal
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.product_cost) || 0;
      const qty = item.quantity || 1;
      return total + (cost * qty);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      getCartTotal, // Exported as a function now
      isCartOpen, 
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);