import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Notificaciones con Sonner

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          toast.success(`${product.title} añadido al carrito.`);
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast.error("No hay suficiente stock disponible.");
          return prevCart;
        }
      } else {
        if (product.stock > 0) {
          toast.success(`${product.title} añadido al carrito.`);
          return [...prevCart, { ...product, quantity: 1 }];
        } else {
          toast.error("No hay stock disponible.");
          return prevCart;
        }
      }
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId && quantity <= item.stock
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    toast("Producto eliminado del carrito.");
  };

  const startCheckout = () => {
    const outOfStockItems = cart.filter((item) => item.quantity > item.stock);

    if (outOfStockItems.length > 0) {
      toast.error("Algunos productos superan el stock disponible.");
      return;
    }

    toast.success("¡Preparando el checkout!");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        handleRemoveFromCart,
        startCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};








