import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Importamos PropTypes
import { toast } from 'sonner'; // Importamos el hook para las notificaciones

// Creamos el contexto del carrito
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1; // Incrementa la cantidad
        toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
        return updatedCart;
      }
      toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error('Producto eliminado del carrito'); // Notificación
  };

  // Actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item // Aseguramos que la cantidad sea al menos 1
      );
    });
    toast.info('Cantidad actualizada'); // Notificación
  };

  // Obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener el total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Aseguramos que 'children' sea un nodo de React
};

// Hook personalizado para acceder al carrito
export const useCart = () => useContext(CartContext);


