// Ejemplo del CartContext, asegúrate de que la función getTotal esté bien definida
import  { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Funciones para agregar, eliminar y actualizar productos en el carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (prodId) => {
    setCart((prevCart) => prevCart.filter((product) => product.cartItemId !== prodId));
  };

  const updateQuantity = (prodId, newQuantity) => {
    setCart((prevCart) => 
      prevCart.map((product) =>
        product.cartItemId === prodId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const startCheckout = () => {
    // Lógica de pago o proceso de checkout
    console.log("Iniciando compra...");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity, startCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
};















