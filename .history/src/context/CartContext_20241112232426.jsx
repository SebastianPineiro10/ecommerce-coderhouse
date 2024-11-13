import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para generar un ID único para cada producto en el carrito
  const generateCartItemId = (item) => `cart-${item.id}-${Date.now()}`;

  // Agregar un producto al carrito
  const addToCart = (item, quantity = 1) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + quantity } // Actualizamos la cantidad
          : i // De lo contrario, dejamos los demás productos igual
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${item.title} actualizada.`);
    } else {
      // Si el producto no está en el carrito, agregamos el producto con un ID único
      const newItem = { ...item, quantity, cartItemId: generateCartItemId(item) };
      setCart([...cart, newItem]);
      toast.success(`${item.title} ha sido añadido al carrito.`);
    }
  };

  // Eliminar un producto del carrito usando su ID único
  const removeFromCart = (prodId) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== prodId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito.");
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (prodId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Evitar cantidades negativas o no válidas
    const updatedCart = cart.map((item) =>
      item.cartItemId === prodId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada.");
  };

  // Obtener el total del carrito (precio total)
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
        updateQuantity,
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


















