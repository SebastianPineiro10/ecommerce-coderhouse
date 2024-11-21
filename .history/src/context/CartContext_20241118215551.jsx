import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito utilizando solo el id del producto
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Si el producto ya existe en el carrito
      const totalQuantity = existingItem.quantity + 1; // Incrementar la cantidad del producto

      // Verificar si la cantidad no excede el stock
      if (totalQuantity <= product.stock) {
        // Actualizar la cantidad en el carrito
        setCart(prevCart => 
          prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: totalQuantity } : item
          )
        );
        toast.success(`La cantidad de ${product.title} se ha actualizado a ${totalQuantity}`);
      } else {
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
    } else {
      // Si el producto no está en el carrito y hay stock disponible
      if (product.stock > 0) {
        const newCartItem = {
          ...product,
          quantity: 1, // La cantidad inicial es 1
        };
        setCart(prevCart => [...prevCart, newCartItem]); // Agregar el nuevo producto al carrito
        toast.success(`${product.title} ha sido añadido al carrito`);
      } else {
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1

    const item = cart.find(item => item.id === productId);

    // Verificar si la nueva cantidad no excede el stock
    if (item && quantity <= item.stock) {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
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






















