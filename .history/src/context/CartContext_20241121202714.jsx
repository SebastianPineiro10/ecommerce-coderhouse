import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false); // Para manejar la visibilidad del carrito

  const addToCart = (product) => {
    if (!product || !product.id || !product.price || !product.quantity) {
      console.error("El producto tiene datos faltantes o inválidos:", product);
      return;
    }

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

  const removeById = (id) => {
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    setCart(arrayFiltrado);
  };

  const resetCart = () => {
    setCart([]);
  };

  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0;
  };

  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      if (!elemento.price || !elemento.quantity) {
        console.warn("Producto con datos incompletos:", elemento);
        return acc;
      }
      return acc + elemento.price * elemento.quantity;
    }, 0);

    return total;
  };

  const toggleCart = () => {
    setOpenCart(!openCart); // Cambiar estado de visibilidad del carrito
  };

  let data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalQuantity,
    getTotalAmount,
    openCart,
    toggleCart, // Para alternar la visibilidad del carrito
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};













