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
    // Verificamos si el producto ya existe en el carrito
    const itemRepeat = cart.find((i) => i.id === item.id);

    if (itemRepeat) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedCart = cart.filter((i) => i.id !== item.id); // Eliminamos el producto repetido
      setCart([...updatedCart, { ...item, quantity: itemRepeat.quantity + quantity }]); // Actualizamos con nueva cantidad
    } else {
      // Si el producto no existe, lo agregamos al carrito
      setCart([...cart, { ...item, quantity }]);
    }

    toast.success(`${item.title} ha sido añadido al carrito`);
  };

  // Eliminar producto del carrito usando el id del producto
  const removeFromCart = (prodId) => {
    const updatedCart = cart.filter((i) => i.id !== prodId); // Eliminamos el producto usando el id
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (prodId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Validamos que la cantidad sea válida

    const updatedCart = cart.map((item) =>
      item.id === prodId ? { ...item, quantity } : item // Solo actualizamos la cantidad si coincide el id
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














