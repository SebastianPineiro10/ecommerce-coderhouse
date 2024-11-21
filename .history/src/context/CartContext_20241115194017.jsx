import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";  // Notificaciones

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  // Función para generar un ID único para cada producto en el carrito
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    let isInCart = cart.some((el) => el.id === product.id);  

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      let updatedCart = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,  // Mantenemos las propiedades del producto
            quantity: elemento.quantity + (product.quantity || 1),  // Aumentamos la cantidad
          };
        }
        return elemento;  // Si no es el producto, lo dejamos igual
      });

      setCart(updatedCart);  // Actualizamos el carrito con el nuevo array
      toast.success(`${product.title} cantidad actualizada en el carrito`);  // Notificación
    } else {
      // Si el producto no está en el carrito, lo agregamos con la cantidad inicial
      const newCartItem = {
        ...product,  // Copiamos las propiedades del producto
        cartItemId: generateCartItemId(),  // Generamos un ID único para el carrito
        quantity: product.quantity || 1,  // Si no tiene cantidad, la inicializamos en 1
      };
      setCart((prevCart) => [...prevCart, newCartItem]);  // Agregamos el nuevo producto al carrito
      toast.success(`${product.title} ha sido añadido al carrito`);  // Notificación
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.cartItemId !== cartItemId);  // Filtramos el producto por ID
      toast.error("Producto eliminado del carrito");  // Notificación
      return updatedCart;  // Retornamos el carrito actualizado
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;  // Validamos que la cantidad sea un número positivo
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item  // Actualizamos la cantidad del producto
      );
      toast.info("Cantidad actualizada");  // Notificación
      return updatedCart;  // Retornamos el carrito actualizado
    });
  };

  // Función para obtener el total del carrito (precio * cantidad de cada producto)
  const getTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;  // Aseguramos que el precio sea un número
      const itemQuantity = parseInt(item.quantity) || 0;  // Aseguramos que la cantidad sea un número
      return total + (itemPrice * itemQuantity);  // Suma de todos los productos
    }, 0);
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









