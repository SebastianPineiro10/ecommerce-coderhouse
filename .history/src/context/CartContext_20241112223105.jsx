import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya existe, incrementamos la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // Incrementar la cantidad
          : item
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${product.title} actualizada`);
    } else {
      // Si no está en el carrito, lo agregamos con la cantidad inicial
      setCart([...cart, { ...product, quantity }]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar un producto del carrito (eliminamos solo una instancia)
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    // Si el carrito no cambió, significa que no se encontró el producto
    if (updatedCart.length === cart.length) {
      toast.warning("No se encontró el producto para eliminar");
    } else {
      toast.error("Producto eliminado del carrito");
    }
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Evitar cantidades negativas o cero

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














