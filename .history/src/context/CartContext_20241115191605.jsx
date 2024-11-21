import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Genera un ID único para cada producto en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Agregar un producto al carrito
  const addToCart = (product) => {
    // Verificamos si el producto ya está en el carrito
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity, // Aumentamos la cantidad
          };
        }
        return item;
      });
      setCart(updatedCart); // Actualizamos el carrito
      toast.success(`${product.title} cantidad actualizada en el carrito`);
    } else {
      // Si el producto no está en el carrito, lo agregamos con la cantidad inicial
      const newCartItem = { 
        ...product, 
        cartItemId: generateCartItemId(), 
        quantity: product.quantity 
      };
      setCart((prevCart) => [...prevCart, newCartItem]); // Agregamos el nuevo producto
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Validamos que la cantidad sea válida

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
  };

  // Obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]); 
    toast.success("Carrito vacío");
  };

  // Iniciar proceso de checkout
  const startCheckout = () => {
    setIsCheckout(true);
  };

  // Reiniciar el estado de checkout
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

// Propiedades esperadas para el CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el carrito en otras partes de la aplicación
export const useCart = () => {
  return useContext(CartContext);
};
