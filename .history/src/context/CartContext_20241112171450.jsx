import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creación del contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Generar un ID único para cada entrada en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.cartItemId
    );

    if (existingItem) {
      // Si el producto ya existe, actualizamos su cantidad
      updateQuantity(existingItem.cartItemId, existingItem.quantity + quantity);
    } else {
      // Si es un nuevo producto, creamos una nueva entrada con un ID único
      const newCartItem = {
        ...product,
        cartItemId: generateCartItemId(),
        quantity,
      };
      setCart((prevCart) => [...prevCart, newCartItem]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar producto del carrito usando cartItemId
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto usando cartItemId
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Validación de la cantidad
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
  };

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
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

export const useCart = () => {
  return useContext(CartContext);
};








