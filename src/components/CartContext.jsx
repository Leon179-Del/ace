import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      // Use product_id to match your database structure
      const existingItem = prev.find(item => item.product_id === product.product_id);
      
      if (existingItem) {
        // If it exists, increase quantity
        return prev.map(item => 
          item.product_id === product.product_id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      // If it's new, spread the previous array AND add the new product object
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Slide the sidebar open so the user sees the success
    setIsCartOpen(true);
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.product_id !== productId));
  };

  // Clear cart (Use this after a successful payment)
  const clearCart = () => {
    setCart([]);
  };

  // Calculate Total - ensuring we parse the cost as a number
  const cartTotal = cart.reduce((total, item) => {
    const cost = parseFloat(item.product_cost) || 0;
    const qty = item.quantity || 1;
    return total + (cost * qty);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      cartTotal, 
      isCartOpen, 
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);