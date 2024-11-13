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
    // Buscamos si el producto ya está en el carrito
    const itemRepeat = cart.find((i) => i.id === item.id);

    if (itemRepeat) {
      // Si ya existe, actualizamos la cantidad
      const updatedCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      );
      setCart(updatedCart);
    } else {
      // Si no existe, lo agregamos con la cantidad inicial
      setCart([...cart, { ...item, quantity }]);
    }

    toast.success(`${item.title} ha sido añadido al carrito`);
  };

  // Eliminar producto del carrito usando el id del producto
  const removeFromCart = (prodId) => {
    const updatedCart = cart.filter((i) => i.id !== prodId);
    setCart(updatedCart);

    // Si el carrito no cambió, significa que no se encontró el producto
    if (updatedCart.length === cart.length) {
      toast.warning("No se encontró el producto para eliminar");
    } else {
      toast.error("Producto eliminado del carrito");
    }
  };

  // Actualizar cantidad de un producto usando id
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Aseguramos que la cantidad sea válida y mayor que 0

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);

    toast.info("Cantidad actualizada");
  };

  // Obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  // Obtener la cantidad total de productos
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
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
















