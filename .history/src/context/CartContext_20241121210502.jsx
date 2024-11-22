import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

// Contexto de carrito
export const CartContext = createContext();

// Hook para usar el carrito
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.cartItemId === product.cartItemId);

      if (existingProduct) {
        // Verificar si hay stock suficiente
        if (existingProduct.quantity < product.stock) {
          toast.success(`${product.title} cantidad incrementada.`, { duration: 2000 });
          return prevCart.map(item =>
            item.cartItemId === product.cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast.error(`No hay suficiente stock para agregar más de ${product.title}.`, { duration: 2000 });
          return prevCart;
        }
      } else {
        // Agregar el producto si no está en el carrito
        toast.success(`${product.title} ha sido agregado al carrito.`, { duration: 2000 });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (prodId) => {
    setCart((prevCart) => {
      const removedProduct = prevCart.find(item => item.cartItemId === prodId);
      toast.error(`${removedProduct?.title} ha sido eliminado del carrito.`, { duration: 2000 });
      return prevCart.filter(item => item.cartItemId !== prodId);
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (prodId, quantity) => {
    setCart((prevCart) => {
      const productToUpdate = prevCart.find(item => item.cartItemId === prodId);

      // Validación de stock antes de actualizar la cantidad
      if (productToUpdate && quantity <= productToUpdate.stock && quantity > 0) {
        toast.info(`Cantidad de ${productToUpdate.title} actualizada a ${quantity}.`, { duration: 2000 });
        return prevCart.map(item =>
          item.cartItemId === prodId ? { ...item, quantity } : item
        );
      } else {
        toast.error("Cantidad no válida o fuera de stock.", { duration: 2000 });
        return prevCart;
      }
    });
  };

  // Función para calcular el total del carrito
  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Función para calcular la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  // Función para iniciar el proceso de checkout
  const startCheckout = () => {
    console.log("Iniciando proceso de compra...");
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



















