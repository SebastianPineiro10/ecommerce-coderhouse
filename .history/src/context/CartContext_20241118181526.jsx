import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.cartItemId === product.cartItemId);

    if (existingItem) {
      // Si el producto ya existe en el carrito, verificamos la cantidad
      const totalQuantity = existingItem.quantity + 1;

      // Comprobamos si la cantidad total no excede el stock
      if (totalQuantity <= product.stock) {
        // Si no se excede el stock, actualizamos la cantidad
        setCart((prevCart) => {
          return prevCart.map(item =>
            item.cartItemId === product.cartItemId
              ? { ...item, quantity: totalQuantity }
              : item
          );
        });
        toast.success(`Cantidad de ${product.title} actualizada a ${totalQuantity}`);
      } else {
        // Si la cantidad excede el stock, mostramos un mensaje de error
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      if (product.stock > 0) {
        const newCartItem = { ...product, cartItemId: generateCartItemId(), quantity: 1 };
        setCart((prevCart) => [...prevCart, newCartItem]);
        toast.success(`${product.title} ha sido añadido al carrito`);
      } else {
        // Si el producto está agotado, mostramos un mensaje de error
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
  };

  // Función para obtener el total de la compra
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

// Custom hook para consumir el CartContext
export const useCart = () => useContext(CartContext);












