
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner'; // Notificaciones de sonner

// Crear el contexto
const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        // Si el producto ya existe, solo aumentamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        toast.success(`${product.title} ha sido añadido al carrito`);
        return updatedCart;
      }
      // Si el producto no existe, lo agregamos con cantidad 1
      toast.success(`${product.title} ha sido añadido al carrito`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error('Producto eliminado del carrito');
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
    });
    toast.info('Cantidad actualizada');
  };

  // Obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener el total de productos
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
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al carrito
export const useCart = () => useContext(CartContext);

