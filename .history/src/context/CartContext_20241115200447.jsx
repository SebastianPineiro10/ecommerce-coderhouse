// CartContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Si el producto ya existe en el carrito, actualizar su cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + (product.quantity || 1),  // Asegurarse de sumar la cantidad correctamente
          };
        }
        return item;
      });
      setCart(updatedCart);
      toast.success(`${product.title} actualizado en el carrito`);
    } else {
      // Si el producto no está en el carrito, agregarlo con un cartItemId único
      setCart([...cart, { ...product, cartItemId: generateCartItemId(), quantity: product.quantity || 1 }]);
      toast.success(`${product.title} agregado al carrito`);
    }
  };

  const removeFromCart = (cartItemId) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return; // Validación para evitar cantidades negativas
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



