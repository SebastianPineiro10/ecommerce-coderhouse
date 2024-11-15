import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  
  const addToCart = (product) => {
    const newCartItem = { ...product, cartItemId: generateCartItemId(), quantity: 1 };
    setCart((prevCart) => [...prevCart, newCartItem]);
    toast.success(`${product.title} ha sido añadido al carrito`);
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













