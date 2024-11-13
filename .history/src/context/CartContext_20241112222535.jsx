import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (item, quantity) => {
    // Verificar si el producto ya existe en el carrito
    const itemRepeat = cart.find((i) => i.id === item.id);

    if (itemRepeat) {
      // Si ya existe, filtramos y actualizamos la cantidad
      const updatedCart = cart.filter((i) => i.id !== item.id);
      setCart([
        ...updatedCart,
        { ...item, quantity: itemRepeat.quantity + quantity },
      ]);
    } else {
      // Si no existe, agregamos el nuevo producto con la cantidad especificada
      setCart([...cart, { ...item, quantity }]);
    }

    toast.success(`${item.title} ha sido añadido al carrito`);
  };

  // Eliminar producto del carrito usando el id del producto
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      if (updatedCart.length === prevCart.length) {
        toast.warning("No se encontró el producto para eliminar");
      } else {
        toast.error("Producto eliminado del carrito");
      }
      return updatedCart;
    });
  };

  // Actualizar cantidad de un producto usando id
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Aseguramos que la cantidad sea válida
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      );
      toast.info("Cantidad actualizada");
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
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}
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














