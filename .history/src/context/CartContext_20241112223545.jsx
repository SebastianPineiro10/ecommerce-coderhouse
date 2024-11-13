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
    // Verificamos si el producto ya existe en el carrito por su id
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya existe, actualizamos la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }  // Incrementamos solo la cantidad
          : item
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${product.title} actualizada`);
    } else {
      // Si no existe, lo agregamos al carrito con la cantidad inicial
      const newProduct = {
        ...product,
        quantity,  // Agregamos la cantidad
      };
      setCart([...cart, newProduct]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId) => {
    // Filtramos el carrito para eliminar solo esa instancia del producto
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

    // Actualizamos la cantidad solo del producto con ese id
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













