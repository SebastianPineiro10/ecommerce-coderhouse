import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para generar un ID único para cada producto en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Buscar si el producto ya está en el carrito usando solo el 'id' del producto
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Si el producto ya existe en el carrito, actualizar la cantidad
      const updatedQuantity = existingItem.quantity + 1;

      // Verificar si la cantidad no excede el stock disponible
      if (updatedQuantity <= product.stock) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: updatedQuantity } // Incrementamos la cantidad
              : item
          )
        );
        toast.success(`La cantidad de ${product.title} se ha actualizado a ${updatedQuantity}`);
      } else {
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
    } else {
      // Si el producto no está en el carrito y hay stock disponible, agregarlo como nuevo ítem
      if (product.stock > 0) {
        const newCartItem = {
          ...product,
          cartItemId: generateCartItemId(), // Generar un ID único para este producto en el carrito
          quantity: 1, // Inicializamos la cantidad en 1
        };
        setCart(prevCart => [...prevCart, newCartItem]);
        toast.success(`${product.title} ha sido añadido al carrito`);
      } else {
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1

    const item = cart.find(item => item.cartItemId === cartItemId);

    // Verificar si la nueva cantidad no excede el stock
    if (item && quantity <= item.stock) {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        );
        toast.info("Cantidad actualizada");
        return updatedCart;
      });
    } else {
      toast.error("No puedes agregar más de lo disponible en stock.");
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





















