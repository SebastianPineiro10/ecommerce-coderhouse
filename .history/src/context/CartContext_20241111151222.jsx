
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito o actualizar la cantidad si ya existe
  const addToCart = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      // Si el producto ya está, actualizamos la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      setCart(updatedCart);
      toast.success(`${product.title} ha sido actualizado en el carrito`);
    } else {
      // Verificamos que el precio sea válido antes de agregar el producto
      const price = parseFloat(product.price);
      if (isNaN(price)) {
        toast.error("El precio del producto es inválido.");
        return; // No agregar el producto si el precio no es válido
      }

      const newCartItem = { ...product, quantity: product.quantity || 1, price: price };
      setCart((prevCart) => [...prevCart, newCartItem]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.error("Producto eliminado del carrito");
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (id, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return; // Aseguramos que la cantidad sea válida

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada");
  };

  // Resetear el carrito (vaciarlo)
  const resetCart = () => {
    setCart([]);
    toast.error("Carrito vacío");
  };

  // Obtener el total de la cantidad de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener el total de la compra
  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price); // Aseguramos que el precio sea un número
      const quantity = parseInt(item.quantity, 10); // Aseguramos que la cantidad sea un número entero

      if (!isNaN(price) && !isNaN(quantity)) {
        return total + price * quantity; // Solo sumamos si el precio y la cantidad son válidos
      }
      return total; // Si el precio o la cantidad no son válidos, no sumamos
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetCart,
        getTotalQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para consumir el contexto
export const useCart = () => {
  return useContext(CartContext);
};







