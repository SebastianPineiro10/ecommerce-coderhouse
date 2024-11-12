import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{} {} {quantity: 5}] ---> [{} {} {el modificar}]

  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      console.log("Producto ya está en el carrito, actualizando cantidad...");
      // Si ya está, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity, // Asegurarse de que la cantidad sea un número válido
          };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      console.log("Producto no encontrado en el carrito, agregando...");
      // Si no está en el carrito, agregamos el producto con una cantidad inicial de 1
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
    }
  };

  const resetCart = () => {
    setCart([]); // Limpiar el carrito
  };

  const removeById = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Eliminar producto por ID
  };

  const getTotalQuantity = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0; // Devolver la cantidad del producto o 0 si no lo encuentra
  };

  const getTotalAmount = () => {
    // Calcular el total acumulado en el carrito
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeById, resetCart, getTotalQuantity, getTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};





