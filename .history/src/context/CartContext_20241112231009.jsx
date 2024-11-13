import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (item, quantity) => {
    const itemRepeat = cart.find((i) => i.id === item.id); // Verificamos si ya existe en el carrito

    if (itemRepeat) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedCart = cart.filter((i) => i.id !== item.id); // Eliminamos el producto original
      setCart([
        ...updatedCart,
        { ...item, quantity: quantity + itemRepeat.quantity }, // Sumamos la cantidad
      ]);
      toast.success(`Cantidad de ${item.title} actualizada`);
    } else {
      // Si el producto no está en el carrito, lo añadimos
      setCart([...cart, { ...item, quantity }]);
      toast.success(`${item.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar un producto del carrito
  const removeToCart = (prodId) => {
    const updatedCart = cart.filter((i) => i.id !== prodId); // Eliminamos el producto por su ID
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Función para obtener el total a pagar
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeToCart,
        getTotal,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el contexto del carrito en cualquier componente
export const useCart = () => {
  return useContext(CartContext);
};














