import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner'; // Importamos la librería para las notificaciones

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      // Si el producto no está en el carrito, lo agregamos con una cantidad de 1
      toast.success(`${product.title} añadido al carrito`); // Notificación de éxito
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.error('Producto eliminado del carrito'); // Notificación de error
  };

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Aseguramos que 'children' sea un nodo de React
};

// Hook personalizado para acceder al carrito
export const useCart = () => useContext(CartContext);


