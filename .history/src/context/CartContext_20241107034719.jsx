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
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
        return updatedCart;
      }
      // Si el producto no está en el carrito, lo agregamos
      toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error('Producto eliminado del carrito'); // Notificación
  };

  // Actualizar cantidad de producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item // Evitar cantidades negativas
      );
    });
    toast.info('Cantidad actualizada'); // Notificación
  };

  // Obtener total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener la cantidad total de productos en el carrito
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


