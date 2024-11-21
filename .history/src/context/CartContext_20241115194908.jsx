import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Agregar producto al carrito (actualiza o agrega nuevo producto)
  const addToCart = (product) => {
    // Verificamos si el producto ya está en el carrito
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + (product.quantity || 1), // Aumentamos la cantidad
          };
        }
        return item;
      });
      setCart(updatedCart); // Actualizamos el carrito con el nuevo array
      toast.success(`${product.title} cantidad actualizada en el carrito`);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      const newProduct = {
        ...product,
        cartItemId: generateCartItemId(),
        quantity: product.quantity || 1, // Si no tiene cantidad, le damos 1 como valor por defecto
      };
      setCart((prevCart) => [...prevCart, newProduct]); // Agregamos el producto al carrito
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Carrito vacío");
  };

  const startCheckout = () => {
    setIsCheckout(true);
  };

  const resetCheckout = () => {
    setIsCheckout(false);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
      getTotalQuantity,
      clearCart,
      startCheckout,
      resetCheckout,
      isCheckout
    }}>
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









