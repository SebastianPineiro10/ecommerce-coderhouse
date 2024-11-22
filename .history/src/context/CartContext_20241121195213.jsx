import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    if (!product || !product.id || !product.quantity || !product.price) {
      console.error("Producto inválido:", product);
      toast.error("No se pudo agregar el producto al carrito.");
      return;
    }

    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
      toast.success(`Cantidad de ${product.title} actualizada en el carrito.`);
    } else {
      // Si no está en el carrito, lo agregamos
      setCart((prevCart) => [...prevCart, { ...product }]);
      toast.success(`${product.title} añadido al carrito.`);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error("Producto eliminado del carrito.");
  };

  // Función para obtener el total de la compra
  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
    toast.success("Carrito vaciado.");
  };

  // Función para iniciar el proceso de checkout
  const startCheckout = () => {
    setIsCheckout(true);
  };

  // Función para resetear el estado de checkout
  const resetCheckout = () => {
    setIsCheckout(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotal,
        getTotalQuantity,
        clearCart,
        startCheckout,
        resetCheckout,
        isCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook para consumir el CartContext
export const useCart = () => useContext(CartContext);










