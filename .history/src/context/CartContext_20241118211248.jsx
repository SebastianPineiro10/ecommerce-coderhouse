import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío inicialmente

  // Función para agregar productos al carrito
  const addToCart = (item, quantity) => {
    const itemRepeat = cart.find(i => i.id === item.id); // Verifica si ya existe el producto

    if (itemRepeat) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      const newQuantity = itemRepeat.quantity + quantity;
      if (newQuantity > item.stock) {
        toast.error(`No puedes agregar más de ${item.stock} unidades de ${item.title}.`);
      } else {
        const cartNew = cart.filter(i => i.id !== item.id); // Filtramos el producto repetido
        setCart([...cartNew, {...item, quantity: newQuantity}]); // Actualizamos la cantidad
        toast.success(`La cantidad de ${item.title} se ha actualizado a ${newQuantity}`);
      }
    } else {
      // Si el producto no está en el carrito, lo agrega
      if (quantity <= item.stock) {
        setCart([...cart, {...item, quantity}]);
        toast.success(`${item.title} ha sido añadido al carrito`);
      } else {
        toast.error(`No puedes agregar más de ${item.stock} unidades de ${item.title}.`);
      }
    }
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
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0); // Calcula el total sin valores NaN
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0); // Suma las cantidades de productos
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
























