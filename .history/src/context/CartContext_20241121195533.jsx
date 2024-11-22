import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    if (!product || !product.id || !product.price || !product.quantity) {
      console.error("El producto tiene datos faltantes:", product);
      return;
    }

    const isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Si ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );

      setCart(updatedCart);
    } else {
      // Si no está en el carrito, lo agregamos
      setCart([...cart, product]);
    }
  };

  // Reiniciar el carrito
  const resetCart = () => {
    setCart([]);
  };

  // Eliminar producto por ID
  const removeById = (id) => {
    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
  };

  // Obtener cantidad total de un producto específico
  const getTotalQuantity = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0;
  };

  // Obtener el monto total del carrito
  const getTotalAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Datos del contexto
  const data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalQuantity,
    getTotalAmount,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};











