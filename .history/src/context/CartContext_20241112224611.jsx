import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // El carrito es un arreglo de productos

  // Agregar producto al carrito
  const addToCart = (product) => {
    // Verificamos si el producto ya está en el carrito
    let isInCart = cart.some((el) => el.id === product.id); // booleano

    if (isInCart) {
      // Si el producto ya existe en el carrito, sumamos la cantidad
      const updatedCart = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,
            quantity: elemento.quantity + product.quantity, // Sumamos la cantidad
          };
        }
        return elemento;
      });
      setCart(updatedCart);
    } else {
      // Si no está en el carrito, lo agregamos
      setCart([...cart, product]);
    }
  };

  // Eliminar un producto del carrito por su ID
  const removeById = (id) => {
    const updatedCart = cart.filter((elemento) => elemento.id !== id);
    setCart(updatedCart);
  };

  // Obtener la cantidad total de un producto específico por su ID
  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0; // Si existe, devuelve la cantidad, si no, 0
  };

  // Obtener el total a pagar (suma de todos los productos en el carrito)
  const getTotalAmount = () => {
    return cart.reduce((acc, elemento) => acc + elemento.price * elemento.quantity, 0); // Calcula el total
  };

  // Vaciar el carrito
  const resetCart = () => {
    setCart([]);
  };

  // Pasamos todo a través del contexto
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














