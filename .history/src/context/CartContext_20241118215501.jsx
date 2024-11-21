import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío inicialmente

  // Función para agregar productos al carrito
  const addToCart = (item, quantity) => {
    // Buscar si el producto ya está en el carrito
    const itemRepeat = cart.find(i => i.id === item.id);

    if (itemRepeat) {
      // Si el producto ya existe en el carrito, aumentar la cantidad
      const cartNew = cart.filter(i => i.id !== item.id); // Filtrar el producto repetido
      setCart([ ...cartNew, {...item, quantity: itemRepeat.quantity + quantity}]); // Actualizar la cantidad
      toast.success(`${item.title} ahora tiene ${itemRepeat.quantity + quantity} unidades`);
    } else {
      // Si el producto no está en el carrito, agregarlo
      setCart([...cart, {...item, quantity}]);
      toast.success(`${item.title} ha sido añadido al carrito`);
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
























