import  { createContext, useState, useContext } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Estado inicial del carrito

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Si el producto ya está en el carrito, se actualiza la cantidad
      const isInCart = prevCart.some((item) => item.id === product.id);
      if (isInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;  // Evitar cantidades inválidas
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Valores que el contexto va a proporcionar
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        getTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};









