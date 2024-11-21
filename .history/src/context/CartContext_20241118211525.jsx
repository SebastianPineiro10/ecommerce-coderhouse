import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío inicialmente

  // Función para agregar productos al carrito
  const addToCart = (item, quantity) => {
    // Verifica si el producto ya está en el carrito
    const itemRepeat = cart.find(i => i.id === item.id);

    // Si el producto ya está en el carrito
    if (itemRepeat) {
      const newQuantity = itemRepeat.quantity + quantity; // Incrementa la cantidad
      if (newQuantity > item.stock) {
        // Si la cantidad total excede el stock
        toast.error(`No puedes agregar más de ${item.stock} unidades de ${item.title}.`);
      } else {
        // Si no excede el stock, actualiza el carrito
        const updatedCart = cart.map(i => 
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
        setCart(updatedCart); // Actualiza el carrito con la nueva cantidad
        toast.success(`La cantidad de ${item.title} ha sido actualizada a ${newQuantity}`);
      }
    } else {
      // Si el producto no está en el carrito, lo agrega con la cantidad indicada
      if (quantity <= item.stock) {
        setCart([...cart, { ...item, quantity }]); // Agrega el producto con la cantidad
        toast.success(`${item.title} ha sido añadido al carrito`);
      } else {
        // Si la cantidad excede el stock
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
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0); // Calcula el total
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























