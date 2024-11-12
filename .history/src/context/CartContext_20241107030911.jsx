import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner';

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        toast.success(`${product.title} ha sido añadido al carrito`);
        return updatedCart;
      }
      toast.success(`${product.title} ha sido añadido al carrito`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error('Producto eliminado del carrito');
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
    toast.info('Cantidad actualizada');
  };

  // Obtener el total del carrito
  const getTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Obtener el total de productos
  const getTotalQuantity = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Validación de las props
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook para usar el carrito
export const useCart = () => useContext(CartContext);


