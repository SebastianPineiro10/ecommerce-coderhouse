import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Notificaciones

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Estado para el carrito
  const [isCheckout, setIsCheckout] = useState(false);  // Estado para saber si estamos en proceso de checkout

  // Función para generar un ID único para cada producto en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    let isInCart = cart.some((el) => el.id === product.id);  // Verificar si el producto ya está en el carrito

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      let nuevoArray = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,  // Copiamos las propiedades del producto existente
            quantity: elemento.quantity + product.quantity,  // Aumentamos la cantidad
          };
        } else {
          return elemento;  // Si no es el producto buscado, lo mantenemos igual
        }
      });
      setCart(nuevoArray);  // Actualizamos el carrito con el nuevo array
      toast.success(`${product.title} cantidad actualizada en el carrito`);  // Notificamos al usuario
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad inicial de 1
      const newCartItem = {
        ...product,  // Copiamos todas las propiedades del producto
        cartItemId: generateCartItemId(),  // Generamos un ID único para el carrito
        quantity: 1,  // Inicializamos la cantidad en 1
      };
      setCart((prevCart) => [...prevCart, newCartItem]);  // Agregamos el nuevo producto al carrito
      toast.success(`${product.title} ha sido añadido al carrito`);  // Notificamos al usuario
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);  // Filtramos el producto por ID
      toast.error("Producto eliminado del carrito");  // Notificamos la eliminación
      return updatedCart;  // Retornamos el carrito actualizado
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;  // Validamos que la cantidad sea mayor que 0
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item  // Actualizamos la cantidad del producto
      );
      toast.info("Cantidad actualizada");  // Notificamos la actualización
      return updatedCart;  // Retornamos el carrito actualizado
    });
  };

  // Función para obtener el total del carrito (precio * cantidad de cada producto)
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);  // Suma de todos los productos
  };

  // Función para obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);  // Suma de las cantidades de los productos
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]); 
    toast.success("Carrito vacío");  // Notificamos al vaciar el carrito
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







