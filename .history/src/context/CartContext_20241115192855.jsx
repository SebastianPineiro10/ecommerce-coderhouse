import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";  // Importando la librería para mostrar notificaciones

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // El estado que guarda el carrito de compras
  const [isCheckout, setIsCheckout] = useState(false);  // Estado que marca si se está realizando un checkout

  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`; // Genera un ID único para cada producto en el carrito

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    // Verificamos si el producto ya existe en el carrito
    const isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          // Aumentamos la cantidad del producto
          return { 
            ...item, 
            quantity: item.quantity + product.quantity 
          };
        }
        return item;  // Retornamos el resto de los productos sin cambios
      });

      setCart(updatedCart);  // Actualizamos el carrito con la nueva cantidad
      toast.success(`${product.title} cantidad actualizada en el carrito`);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      const newCartItem = { 
        ...product, 
        cartItemId: generateCartItemId(),  // Creamos un ID único para el producto
        quantity: product.quantity, // Asignamos la cantidad inicial que se pasa como parámetro
      };
      setCart((prevCart) => [...prevCart, newCartItem]); // Agregamos el nuevo producto al carrito
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;  // Retornamos el carrito sin el producto eliminado
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;  // Validamos que la cantidad sea válida
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
      );
      toast.info("Cantidad actualizada");
      return updatedCart;  // Retornamos el carrito con la cantidad actualizada
    });
  };

  // Función para obtener el total de todos los productos en el carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);  // Calcula el total sumando los precios
  };

  // Función para obtener la cantidad total de productos (sin multiplicar por el precio)
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);  // Sumamos solo las cantidades
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);  // Vaciamos el carrito
    toast.success("Carrito vacío");
  };

  // Función para iniciar el checkout (cuando el usuario quiere pagar)
  const startCheckout = () => {
    setIsCheckout(true);
  };

  // Función para resetear el estado de checkout
  const resetCheckout = () => {
    setIsCheckout(false);
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
        clearCart,
        startCheckout,
        resetCheckout,
        isCheckout,
      }}
    >
      {children} {/* Renderiza todos los componentes hijos */}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Propiedades de los componentes hijos
};

// Hook para acceder al contexto del carrito en cualquier componente
export const useCart = () => {
  return useContext(CartContext);
};



