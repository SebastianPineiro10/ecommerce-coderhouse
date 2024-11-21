import { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Generar un ID único para cada item del carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Crear un objeto de búsqueda para el carrito, mejorando la eficiencia
  const cartMap = cart.reduce((acc, item) => {
    acc[item.cartItemId] = item;
    return acc;
  }, {});

  // Función para agregar productos al carrito
  const addToCart = useCallback((product) => {
    // Buscar si el producto ya está en el carrito
    const existingItem = cartMap[product.cartItemId];

    if (existingItem) {
      // Comprobar si la cantidad total no excede el stock
      const totalQuantity = existingItem.quantity + 1;
      if (totalQuantity <= product.stock) {
        updateQuantity(existingItem.cartItemId, totalQuantity); // Incrementar la cantidad si no se excede el stock
      } else {
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
    } else {
      // Si el producto no está en el carrito, agregarlo
      if (product.stock > 0) {
        const newCartItem = { ...product, cartItemId: generateCartItemId(), quantity: 1 };
        setCart((prevCart) => [...prevCart, newCartItem]);
        toast.success(`${product.title} ha sido añadido al carrito`);
      } else {
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  }, [cart]);

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

    const product = cartMap[cartItemId];
    if (product && quantity <= product.stock) {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        );
        toast.info("Cantidad actualizada");
        return updatedCart;
      });
    } else {
      toast.error(`La cantidad no puede exceder el stock de ${product?.stock} unidades`);
    }
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









