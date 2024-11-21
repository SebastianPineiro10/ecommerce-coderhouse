import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";  // Importamos PropTypes
import { toast } from "sonner";      // Importamos Sonner para las notificaciones

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío al inicio

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const isInCart = cart.some((el) => el.id === product.id); // Verifica si el producto ya está en el carrito

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + (product.quantity || 1), // Sumamos cantidades
          };
        }
        return item;
      });
      setCart(updatedCart); // Actualizamos el carrito
      toast.success(`Cantidad de ${product.title} actualizada a ${product.quantity + 1}`); // Mensaje de éxito
    } else {
      // Si el producto no está en el carrito, lo agregamos
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
      toast.success(`${product.title} añadido al carrito`); // Mensaje de éxito
    }
  };

  // Función para eliminar un producto por su id
  const removeById = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Actualizamos el carrito sin el producto eliminado
    toast.error("Producto eliminado del carrito"); // Mensaje de error
  };

  // Función para restablecer el carrito (vaciar)
  const resetCart = () => {
    setCart([]); // Dejar el carrito vacío
    toast.success("Carrito vacío"); // Mensaje de éxito
  };

  // Obtener la cantidad total de un producto específico
  const getTotalQuantity = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0; // Si el producto está, devolver su cantidad, sino 0
  };

  // Calcular el total del carrito
  const getTotalAmount = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total; // Total acumulado
  };

  // El valor que se pasará al contexto
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

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validamos que 'children' sea un nodo válido
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  return useContext(CartContext);
};

















