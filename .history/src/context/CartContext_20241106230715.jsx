import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto para el carrito
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        // Si el producto ya existe en el carrito, se actualiza la cantidad
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      }
      // Si no, se agrega el nuevo producto
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};
