import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner'; // Importamos la librería para notificaciones

export const CartContext = createContext();

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
        // Si el producto ya está en el carrito, incrementamos la cantidad
        toast.success(`${product.title} ya está en el carrito, aumentada la cantidad.`, { duration: 2000 });
        return prevCart.map(item =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
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
      toast.error(`${removedProduct?.title} ha sido eliminado del carrito.`, { duration: 2000 });
      return prevCart.filter(item => item.cartItemId !== prodId);
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (prodId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === prodId ? { ...item, quantity } : item
      )
    );
    toast.info(`Cantidad actualizada para este producto.`, { duration: 2000 });
  };

  // Función para calcular el total del carrito
  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Función para calcular la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  // Función para iniciar el proceso de checkout (puedes modificarla según lo necesites)
  const startCheckout = () => {
    // Aquí puedes agregar lógica para redirigir al usuario al proceso de pago, etc.
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
















