import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito o actualizar la cantidad si ya existe
  const addToCart = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
      );
      setCart(updatedCart);
      toast.success(`${product.title} ha sido actualizado en el carrito`);
    } else {
      const newCartItem = { ...product, quantity: product.quantity || 1 };
      setCart((prevCart) => [...prevCart, newCartItem]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (id, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada");
  };

  // Obtener el total de la compra
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener el total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Devolver los valores del contexto
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

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para consumir el contexto
export const useCart = () => {
  return useContext(CartContext);
};







