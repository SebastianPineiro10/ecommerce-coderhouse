import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito (verificando si ya está en el carrito)
  const addToCart = (item, quantity = 1) => {
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      // Si el producto ya está, actualizamos la cantidad
      const updatedCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${item.title} actualizada`);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      const newItem = { ...item, quantity };
      setCart([...cart, newItem]);
      toast.success(`${item.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (prodId) => {
    const updatedCart = cart.filter((item) => item.id !== prodId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Actualizar cantidad de un producto en el carrito
  const updateQuantity = (prodId, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1
    const updatedCart = cart.map((item) =>
      item.id === prodId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada");
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

// Hook para acceder al contexto
export const useCart = () => {
  return useContext(CartContext);
};














