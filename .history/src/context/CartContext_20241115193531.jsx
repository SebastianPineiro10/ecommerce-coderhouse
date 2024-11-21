import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Notificaciones

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para generar un ID único para cada producto
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    let isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Si ya está, generar un nuevo array con el producto actualizado
      let nuevoArray = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,
            quantity: elemento.quantity + product.quantity, // Actualiza la cantidad
          };
        } else {
          return elemento;
        }
      });

      setCart(nuevoArray); // Actualiza el carrito
      toast.success(`${product.title} cantidad actualizada en el carrito`);
    } else {
      // Si no está en el carrito, agregar el producto con la cantidad inicial de 1
      const newCartItem = {
        ...product,
        cartItemId: generateCartItemId(),
        quantity: 1,  // Siempre comienza con cantidad 1
      };
      setCart((prevCart) => [...prevCart, newCartItem]); // Agrega el nuevo producto al carrito
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (cartItemId, quantity) => {
    // Validamos que la cantidad sea mayor a 0
    if (quantity < 1) return;
    
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
  };

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]); 
    toast.success("Carrito vacío");
  };

  // Función para iniciar el proceso de checkout
  const startCheckout = () => {
    setIsCheckout(true);
  };

  // Función para resetear el estado de checkout
  const resetCheckout = () => {
    setIsCheckout(false);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
      getTotalQuantity,
      clearCart,
      startCheckout,
      resetCheckout,
      isCheckout
    }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook para acceder al contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};







