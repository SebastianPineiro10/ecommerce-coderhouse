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
      // Si el producto ya está en el carrito, actualizar la cantidad
      const CartNew = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      );
      setCart(CartNew); // Actualiza el estado del carrito
    } else {
      // Si el producto no está en el carrito, agregarlo
      setCart([...cart, { ...item, quantity }]);
    }

    toast.success(`${item.title} ha sido añadido al carrito`);
  };

  // Eliminar producto del carrito usando el id del producto
  const removeFromCart = (prodId) => {
    // Filtrar el carrito y eliminar el producto por id
    const CartNew = cart.filter((i) => i.id !== prodId);
    setCart(CartNew); // Actualizar el carrito

    // Mostrar el mensaje de eliminación
    if (CartNew.length === cart.length) {
      toast.warning("No se encontró el producto para eliminar");
    } else {
      toast.error("Producto eliminado del carrito");
    }
  };

  // Actualizar cantidad de un producto usando id
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Aseguramos que la cantidad sea válida

    // Actualizar el carrito con la nueva cantidad del producto
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
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
















