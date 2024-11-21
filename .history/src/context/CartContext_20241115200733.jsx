import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Si usas sonner, puedes dejar esta línea

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para generar un cartItemId único
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((el) => el.id === product.id);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar su cantidad
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += product.quantity || 1; // Asegurarse de sumar correctamente
      setCart(updatedCart);
      toast.success(`${product.title} actualizado en el carrito`);
    } else {
      // Si el producto no está en el carrito, agregarlo con un cartItemId único
      const newProduct = { ...product, cartItemId: generateCartItemId(), quantity: product.quantity || 1 };
      setCart([...cart, newProduct]);
      toast.success(`${product.title} agregado al carrito`);
    }
  };

  const removeFromCart = (cartItemId) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return; // Evitar que la cantidad sea menor a 1
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada");
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const startCheckout = () => {
    console.log("Iniciando el proceso de checkout...");
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
        startCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => {
  return useContext(CartContext);
};





