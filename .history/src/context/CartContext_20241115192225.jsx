import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para generar un ID único para el producto en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    // Verificamos si el producto ya está en el carrito
    const isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos su cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          // Actualizamos la cantidad del producto
          return {
            ...item,
            quantity: item.quantity + product.quantity, // Sumamos la cantidad
          };
        }
        return item;
      });

      setCart(updatedCart); // Actualizamos el carrito con el nuevo array
      toast.success(`${product.title} cantidad actualizada en el carrito`);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      const newCartItem = {
        ...product,
        cartItemId: generateCartItemId(), // Asignamos un ID único
        quantity: product.quantity, // Usamos la cantidad inicial proporcionada
      };
      setCart((prevCart) => [...prevCart, newCartItem]); // Agregamos el nuevo producto al carrito
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
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

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
    toast.success("Carrito vacío");
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
        updateQuantity,
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

// Hook para acceder al carrito desde cualquier componente
export const useCart = () => {
  return useContext(CartContext);
};
