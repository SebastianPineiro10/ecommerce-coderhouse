import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Crear el contexto para el carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (item, quantity = 1) => {
    // Verificar si el producto ya existe en el carrito
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualizamos su cantidad
      const updatedCart = cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + quantity } // Sumar la cantidad
          : i
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${item.title} actualizada.`);
    } else {
      // Si no existe, lo agregamos al carrito
      const newItem = { ...item, quantity };
      setCart([...cart, newItem]);
      toast.success(`${item.title} ha sido añadido al carrito.`);
    }
  };

  // Eliminar un producto del carrito por ID
  const removeFromCart = (prodId) => {
    // Filtramos el carrito para eliminar el producto con el ID
    const updatedCart = cart.filter((item) => item.id !== prodId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito.");
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (prodId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Evitar cantidades negativas o no numéricas
    const updatedCart = cart.map((item) =>
      item.id === prodId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada.");
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

// Hook para consumir el contexto del carrito
export const useCart = () => useContext(CartContext);

















