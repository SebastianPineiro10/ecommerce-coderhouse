import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.boxSize === product.boxSize
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualizamos su cantidad
        const updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
        toast.success(`La cantidad de ${product.title} ha sido actualizada`);
        return updatedCart;
      } else {
        // Si el producto no está en el carrito, lo agregamos
        const newCartItem = { ...product, quantity: product.quantity || 1 };
        toast.success(`${product.title} ha sido añadido al carrito`);
        return [...prevCart, newCartItem];
      }
    });
  };

  // Eliminar producto del carrito usando id y boxSize
  const removeFromCart = (productId, boxSize) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.id === productId && item.boxSize === boxSize)
      );
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Actualizar cantidad de un producto usando id y boxSize
  const updateQuantity = (productId, boxSize, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      toast.error('Cantidad inválida');
      return;
    }
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.boxSize === boxSize
          ? { ...item, quantity: quantity }
          : item
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






