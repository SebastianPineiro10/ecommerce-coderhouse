import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  const addToCart = (product) => {
    Let isInCart = cart.some((el)) => el.id === product.id);
    if (isInCart) {
        // Generar un nuevo array , igual q el anterior pero con un objeto modificado
        Let nuevoArray = cart.map((elemento) => {
            if (elemento.id === product.id) {
                return {
                    ...elemento,
                    quantify: elemento.quantify + product.quantify,
                };
            } else {
                return elemento;
            }
        }};
        setCart(nuevoArray);
    } else {
         setCart([...cart, product]);
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