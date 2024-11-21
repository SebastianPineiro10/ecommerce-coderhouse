import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Si deseas mostrar mensajes

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false); // Si quieres mantener el proceso de checkout

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          const updatedQuantity = item.quantity + (product.quantity || 1);
          if (updatedQuantity <= product.stock) {
            toast.success(`Cantidad actualizada a ${updatedQuantity}`);
            return { ...item, quantity: updatedQuantity };
          } else {
            toast.error(`No puedes agregar más de ${product.stock} unidades.`);
          }
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      if (product.stock > 0) {
        setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
        toast.success(`${product.title} agregado al carrito`);
      } else {
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  };

  // Función para eliminar un producto por su id
  const removeById = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Función para restablecer el carrito (vaciar)
  const resetCart = () => {
    setCart([]);
    toast.success("Carrito vaciado");
  };

  // Función para obtener la cantidad total de un producto
  const getTotalQuantity = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0;
  };

  // Calcular el total del carrito
  const getTotalAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Funciones para checkout
  const startCheckout = () => setIsCheckout(true);
  const resetCheckout = () => setIsCheckout(false);

  // El valor que se pasará al contexto
  const data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalQuantity,
    getTotalAmount,
    startCheckout,
    resetCheckout,
    isCheckout
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);
















