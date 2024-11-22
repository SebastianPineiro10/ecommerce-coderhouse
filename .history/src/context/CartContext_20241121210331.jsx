import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { useMemo } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.cartItemId === product.cartItemId);

      if (productIndex >= 0) {
        // Si el producto ya existe, incrementamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[productIndex] = { ...updatedCart[productIndex], quantity: updatedCart[productIndex].quantity + 1 };
        toast.success(`${product.title} ya está en el carrito, cantidad incrementada.`, { duration: 2000 });
        return updatedCart;
      } else {
        // Si el producto no está en el carrito, lo agregamos
        toast.success(`${product.title} ha sido agregado al carrito.`, { duration: 2000 });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (prodId) => {
    setCart((prevCart) => {
      const removedProduct = prevCart.find(item => item.cartItemId === prodId);
      const updatedCart = prevCart.filter(item => item.cartItemId !== prodId);

      if (removedProduct) {
        toast.error(`${removedProduct.title} ha sido eliminado del carrito.`, { duration: 2000 });
      }

      return updatedCart;
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (prodId, quantity) => {
    if (quantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartItemId === prodId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );
      toast.info(`Cantidad actualizada para el producto.`, { duration: 2000 });
    }
  };

  // Función para calcular el total del carrito
  const getTotal = useMemo(() => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }, [cart]);

  // Función para calcular la cantidad total de productos en el carrito
  const getTotalQuantity = useMemo(() => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  }, [cart]);

  // Función para iniciar el proceso de checkout (puedes modificarla según lo necesites)
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


















