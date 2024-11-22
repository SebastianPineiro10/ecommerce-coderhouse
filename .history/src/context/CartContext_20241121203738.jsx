import { createContext, useState, useContext } from "react";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  // Función para validar un producto antes de agregarlo al carrito
  const validarProducto = (product) => {
    return product && product.id && product.price && product.quantity;
  };

  const addToCart = (product) => {
    if (!validarProducto(product)) {
      console.error("El producto tiene datos faltantes o inválidos:", product);
      toast.error("El producto tiene datos incompletos.");
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
      toast.success(`Producto ${product.title} agregado al carrito.`);
    } else {
      setCart([...cart, product]);
      toast.success(`Producto ${product.title} agregado al carrito.`);
    }
  };

  const removeById = (id) => {
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    setCart(arrayFiltrado);
    toast.success("Producto eliminado del carrito.");
  };

  const resetCart = () => {
    setCart([]);
    toast.success("El carrito ha sido vaciado.");
  };

  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0;
  };

  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      if (!validarProducto(elemento)) {
        console.warn("Producto con datos incompletos:", elemento);
        toast.error("Producto con datos incompletos detectado.");
        return acc; // Continuamos sumando los productos válidos
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
    toggleCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};













