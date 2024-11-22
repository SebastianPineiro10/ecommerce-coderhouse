import { createContext, useState} from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Validar que el producto tenga las propiedades necesarias
    if (!product || !product.id || !product.price || !product.quantity) {
      console.error("El producto tiene datos faltantes o inválidos:", product);
      return;
    }

    let isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Crear un nuevo array con el producto actualizado
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
      // Agregar el producto si no está en el carrito
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

  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0;
  };

  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      // Validar que el producto tenga precio y cantidad válidos
      if (!elemento.price || !elemento.quantity) {
        console.warn("Producto con datos incompletos:", elemento);
        return acc;
      }
      return acc + elemento.price * elemento.quantity;
    }, 0);

    return total;
  };

  let data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalQuantity,
    getTotalAmount,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};











