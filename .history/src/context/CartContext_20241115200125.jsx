// CartContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";  // Para las notificaciones

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let isInCart = cart.some((el) => el.id === product.id); // Verificar si ya existe
    if (isInCart) {
      let nuevoArray = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,
            quantity: elemento.quantity + (product.quantity || 1), // Sumar cantidad
          };
        }
        return elemento;
      });
      setCart(nuevoArray);
      toast.success(`${product.title} actualizado en el carrito`);
    } else {
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
      toast.success(`${product.title} agregado al carrito`);
    }
  };

  const removeFromCart = (cartItemId) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return; // Solo si la cantidad es válida
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada");
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const startCheckout = () => {
    // Aquí puedes definir lo que sucede al iniciar el checkout
    console.log("Iniciando el proceso de checkout...");
  };

  const data = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    getTotalQuantity,
    startCheckout,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => {
  return useContext(CartContext);
};

