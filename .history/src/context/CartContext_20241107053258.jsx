import { createContext, useState, useContext } from 'react';

// Contexto del carrito
const CartContext = createContext();

// Hook para usar el carrito
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificamos si el producto ya existe en el carrito
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Si ya existe, actualizamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;  // Aumentamos la cantidad del producto
        return updatedCart;
      } else {
        // Si no existe, agregamos el producto al carrito
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Actualizar cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
    });
  };

  // Obtener el total de la compra
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Obtener el total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};