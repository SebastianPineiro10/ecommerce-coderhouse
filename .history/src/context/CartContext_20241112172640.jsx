import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    // Busca si el producto ya existe en el carrito
    const itemRepeat = cart.find((i) => i.id === item.id);

    if (itemRepeat) {
      // Si el producto ya existe, crea un nuevo carrito sin ese producto
      const cartNew = cart.filter((i) => i.id !== item.id);
      // Agrega el producto con la cantidad actualizada
      setCart([
        ...cartNew,
        { ...item, quantity: quantity + itemRepeat.quantity }
      ]);
      toast.success(`Cantidad de ${item.title} actualizada en el carrito`);
    } else {
      // Si el producto no está en el carrito, se agrega normalmente
      setCart([...cart, { ...item, quantity }]);
      toast.success(`${item.title} ha sido añadido al carrito`);
    }
  };

  const removeFromCart = (prodId) => {
    const cartNew = cart.filter((i) => i.id !== prodId);
    setCart(cartNew);
    toast.error("Producto eliminado del carrito");
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Validación de cantidad mínima
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
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











