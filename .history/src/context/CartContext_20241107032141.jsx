import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Asegúrate de tener esta librería instalada para las notificaciones

// Crear el contexto
const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        toast.success(`${product.title} ha sido añadido al carrito`); // Notificación de éxito
        return updatedCart;
      }
      toast.success(`${product.title} ha sido añadido al carrito`); // Notificación de éxito
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error("Producto eliminado del carrito"); // Notificación de eliminación
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item // Evitar cantidades negativas
      )
    );
    toast.info("Cantidad actualizada"); // Notificación de actualización
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

// Validación de las props
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el carrito
export const useCart = () => useContext(CartContext);



