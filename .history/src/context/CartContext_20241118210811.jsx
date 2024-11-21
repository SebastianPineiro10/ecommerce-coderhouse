import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para generar un ID único para cada producto en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar productos al carrito
  const addToCart = (item, quantity) => {
    const itemRepeat = cart.find(i => i.id === item.id);

    if (itemRepeat) {
      // Si el producto ya está en el carrito, actualizamos su cantidad
      const newQuantity = itemRepeat.quantity + quantity;

      // Verificamos si la nueva cantidad no excede el stock disponible
      if (newQuantity <= item.stock) {
        setCart(prevCart =>
          prevCart.map(i =>
            i.id === item.id
              ? { ...i, quantity: newQuantity } // Actualizamos la cantidad
              : i // Mantener el resto de los productos igual
          )
        );
        toast.success(`${item.title} ahora tiene ${newQuantity} unidades en el carrito.`);
      } else {
        toast.error(`No puedes agregar más de ${item.stock} unidades de ${item.title}.`);
      }
    } else {
      // Si el producto no está en el carrito, lo agregamos con la cantidad inicial
      setCart(prevCart => [...prevCart, { ...item, quantity }]);
      toast.success(`${item.title} ha sido añadido al carrito.`);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1

    const item = cart.find(item => item.cartItemId === cartItemId);

    // Verificar si la nueva cantidad no excede el stock
    if (item && quantity <= item.stock) {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        );
        toast.info("Cantidad actualizada");
        return updatedCart;
      });
    } else {
      toast.error("No puedes agregar más de lo disponible en stock.");
    }
  };

  // Función para obtener el total de la compra
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

// Custom hook para consumir el CartContext
export const useCart = () => useContext(CartContext);
























