import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Crear contexto del carrito
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar producto al carrito
  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Si el producto no está en el carrito, lo agregamos como un nuevo elemento
        return [...prevCart, { ...item, quantity }];
      }
    });

    toast.success(`${item.title} ha sido añadido al carrito`);
  };

  // Función para eliminar un producto del carrito usando su ID
  const removeFromCart = (prodId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== prodId));
    toast.error("Producto eliminado del carrito");
  };

  // Función para actualizar la cantidad de un producto usando su ID
  const updateQuantity = (prodId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Validación para evitar valores inválidos
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === prodId ? { ...item, quantity } : item
      )
    );
    toast.info("Cantidad actualizada");
  };

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => {
  return useContext(CartContext);
};












