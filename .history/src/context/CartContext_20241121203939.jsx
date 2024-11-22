import { createContext, useState, useContext } from "react";
import { toast } from "sonner";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  // Función para validar que el producto tenga los campos necesarios
  const validarProducto = (product) => {
    return product && product.id && product.price && product.quantity && product.title;
  };

  // Función para agregar un producto al carrito
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

  // Función para eliminar un producto por su id
  const removeById = (id) => {
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    setCart(arrayFiltrado);
    toast.success("Producto eliminado del carrito.");
  };

  // Función para vaciar el carrito
  const resetCart = () => {
    setCart([]);
    toast.success("El carrito ha sido vaciado.");
  };

  // Función para obtener la cantidad de un producto en el carrito
  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0;
  };

  // Función para calcular el monto total del carrito
  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      if (!elemento.price || !elemento.quantity) {
        console.warn("Producto con datos incompletos:", elemento);
        toast.error("Producto con datos incompletos detectado.");
        return acc;
      }
      return acc + elemento.price * elemento.quantity;
    }, 0);

    return total;
  };

  // Función para alternar la visibilidad del carrito
  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  // Proveer los datos del carrito a los componentes hijos
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

// Hook para usar el contexto del carrito en otros componentes
export const useCart = () => {
  return useContext(CartContext);
};














