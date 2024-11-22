import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      let nuevoArray = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,
            quantity: elemento.quantity + product.quantity,
          };
        } else {
          return elemento;
        }
      });

      setCart(nuevoArray);
    } else {
      setCart([...cart, product]);
    }
  };

  const resetCart = () => {
    setCart([]);
  };

  const removeById = (id) => {
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    setCart(arrayFiltrado);
  };

  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => acc + elemento.price * elemento.quantity, 0);
    return total;
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
  };

  let data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalAmount,
    getTotalQuantity,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};






















