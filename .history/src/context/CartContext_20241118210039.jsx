import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // El estado del carrito
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Si el producto ya existe, sumamos la cantidad actual con la nueva cantidad
      const newQuantity = existingItem.quantity + 1;

      // Comprobamos que la nueva cantidad no exceda el stock disponible
      if (newQuantity <= product.stock) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: newQuantity } // Actualizamos la cantidad
              : item
          )
        );
        toast.success(`${product.title} ahora tiene ${newQuantity} unidades en el carrito.`);
      } else {
        // Si intentamos agregar más de lo que hay en stock, mostramos un error
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      setCart(prevCart => [
        ...prevCart,
        { ...product, quantity: 1 } // Agregar el producto al carrito
      ]);
      toast.success(`${product.title} ha sido añadido al carrito.`);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId); // Eliminar el producto por id
      toast.error("Producto eliminado del carrito.");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1

    // Buscar el producto en el carrito
    const item = cart.find(item => item.id === productId);
    if (item) {
      // Verificar si la nueva cantidad no excede el stock
      if (quantity <= item.stock) {
        setCart(prevCart => {
          const updatedCart = prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          );
          toast.info("Cantidad actualizada.");
          return updatedCart;
        });
      } else {
        toast.error("No puedes agregar más de lo disponible en stock.");
      }
    }
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
    toast.success("Carrito vacío.");
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

// Custom hook para consumir el CartContext
export const useCart = () => useContext(CartContext);























