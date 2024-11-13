import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (item, quantity = 1) => {
    // Verificamos si el producto ya existe en el carrito
    const itemRepeat = cart.find((i) => i.id === item.id);

    if (itemRepeat) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedCart = cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + quantity } // Sumamos la cantidad
          : i
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${item.title} actualizada`);
    } else {
      // Si el producto no existe, lo agregamos al carrito
      setCart([...cart, { ...item, quantity }]);
      toast.success(`${item.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar un producto del carrito
  const removeToCart = (prodId) => {
    // Filtramos el carrito para eliminar el producto con el id correspondiente
    const updatedCart = cart.filter((i) => i.id !== prodId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Función para obtener el total a pagar
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función para obtener la cantidad total de productos
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

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};














