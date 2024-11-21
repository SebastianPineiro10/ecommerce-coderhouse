import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío inicialmente

  // Función para agregar productos al carrito
  const addToCart = (product, quantity) => {
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Si el producto ya existe en el carrito, aumentar la cantidad
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // Se actualiza la cantidad
          : item
      );
      setCart(updatedCart);
      toast.success(`${product.title} ahora tiene ${existingItem.quantity + quantity} unidades`);
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad deseada
      const newCartItem = {
        ...product,
        quantity: quantity, // Se agrega con la cantidad proporcionada
      };
      setCart(prevCart => [...prevCart, newCartItem]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Función para obtener el total de la compra
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
    toast.success("Carrito vacío");
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      getTotal,
      getTotalQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook para consumir el CartContext
export const useCart = () => useContext(CartContext);
























