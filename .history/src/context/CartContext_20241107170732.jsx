import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; 
import { toast } from "sonner"; 

// Creamos el contexto del carrito
const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Buscar si el producto ya existe en el carrito
      const productIndex = prevCart.findIndex((item) => item.id === product.id);

      if (productIndex >= 0) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity } // Sumar la cantidad
            : item
        );
        toast.success(`${product.title} cantidad actualizada en el carrito`); // Notificación
        return updatedCart;
      }

      // Si el producto no está en el carrito, agregarlo como nuevo producto
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
      return updatedCart;
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      toast.error('Producto eliminado del carrito'); // Notificación
      return updatedCart;
    });
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      toast.info('Cantidad actualizada'); // Notificación
      return updatedCart;
    });
  };

  // Obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener la cantidad total de productos
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Validación de las props para el componente CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};

