// context/CartContext.js
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Verifica si el producto ya existe en el carrito
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      // Si ya está en el carrito, actualiza la cantidad
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      ));
    } else {
      // Si no está en el carrito, lo agrega como nuevo producto
      setCart([...cart, product]);
    }
  };

  const removeById = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const resetCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeById,
        resetCart,
        getTotalQuantity,
        getTotalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);




