import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Comprobamos si el producto ya está en el carrito usando el `id`
      const isInCart = prevCart.some((el) => el.id === product.id);

      if (isInCart) {
        console.log("Producto ya en el carrito, actualizando cantidad");
        
        // Generar un nuevo array con el producto modificado en cantidad
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );

        // Actualizar el carrito con el nuevo array
        setCart(updatedCart);
        toast.success(`${product.title} cantidad actualizada en el carrito`);
      } else {
        console.log("Producto nuevo, agregando al carrito");

        // Agregar el producto como un nuevo elemento en el carrito
        setCart([...prevCart, product]);
        toast.success(`${product.title} ha sido añadido al carrito`);
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeById = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para resetear el carrito
  const resetCart = () => {
    setCart([]);
    toast.info("Carrito vaciado");
  };

  // Obtener la cantidad total de un producto específico en el carrito
  const getTotalQuantity = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0;
  };

  // Calcular el monto total del carrito
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Valores y funciones disponibles en el contexto
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

// Validación de las props para el componente CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};






