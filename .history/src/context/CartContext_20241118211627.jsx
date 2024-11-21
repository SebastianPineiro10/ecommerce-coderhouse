import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creación del contexto del carrito
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío inicialmente

  // Función para agregar productos al carrito
  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const itemRepeat = prevCart.find(i => i.id === item.id);

      if (itemRepeat) {
        const newQuantity = itemRepeat.quantity + quantity;
        if (newQuantity > item.stock) {
          toast.error(`No puedes agregar más de ${item.stock} unidades de ${item.title}.`);
          return prevCart; // Retorna el carrito sin cambios
        }
        const updatedCart = prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
        toast.success(`La cantidad de ${item.title} ha sido actualizada a ${newQuantity}`);
        return updatedCart;
      } else {
        if (quantity > item.stock) {
          toast.error(`No puedes agregar más de ${item.stock} unidades de ${item.title}.`);
          return prevCart; // Retorna el carrito sin cambios
        }
        toast.success(`${item.title} ha sido añadido al carrito`);
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
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























