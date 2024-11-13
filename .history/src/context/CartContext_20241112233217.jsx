import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (item, quantity = 1) => {
    // Verificar si el producto ya está en el carrito
    const itemRepeat = cart.find(i => i.id === item.id);
    
    if (itemRepeat) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const cartNew = cart.filter(i => i.id !== item.id); // Eliminar la entrada existente
      setCart([
        ...cartNew, 
        { ...item, quantity: itemRepeat.quantity + quantity } // Agregar la nueva cantidad
      ]);
      toast.success(`Cantidad de ${item.title} actualizada.`);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      setCart([...cart, { ...item, quantity }]);
      toast.success(`${item.title} ha sido añadido al carrito.`);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = (prodId) => {
    const cartNew = cart.filter(i => i.id !== prodId); // Filtrar el producto por su id
    setCart(cartNew);
    toast.error("Producto eliminado del carrito.");
  };

  // Obtener el total del carrito (precio total)
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
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

// Hook para acceder al contexto
export const useCart = () => useContext(CartContext);



















