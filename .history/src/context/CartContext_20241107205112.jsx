import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    console.log('Producto añadido:', product);

    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex((item) => item.id === product.id && item.boxSize === product.boxSize);

    console.log('Producto existente:', existingProductIndex);
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, solo actualizar la cantidad
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1
        };
        console.log('Carrito actualizado:', updatedCart);
        return updatedCart;
      });
      toast.success(`La cantidad de ${product.title} ha sido actualizada`);
    } else {
      // Si el producto no está en el carrito, agregarlo
      const newCartItem = { ...product, quantity: 1 };
      setCart((prevCart) => [...prevCart, newCartItem]);
      console.log('Nuevo producto añadido al carrito:', newCartItem);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar producto del carrito usando id y boxSize
  const removeFromCart = (productId, boxSize) => {
    console.log('Producto a eliminar:', productId, boxSize);

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId || item.boxSize !== boxSize);
      console.log('Carrito después de eliminar producto:', updatedCart);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  // Actualizar cantidad de un producto usando id y boxSize
  const updateQuantity = (productId, boxSize, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      console.log('Cantidad inválida:', quantity);
      return;
    }

    console.log('Actualizar cantidad de producto:', productId, boxSize, quantity);
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.boxSize === boxSize
          ? { ...item, quantity: quantity }
          : item
      );
      console.log('Carrito después de actualizar cantidad:', updatedCart);
      toast.info("Cantidad actualizada");
      return updatedCart;
    });
  };

  // Obtener el total del carrito
  const getTotal = () => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
    console.log('Total del carrito:', total);
    return total;
  };

  // Obtener la cantidad total de productos
  const getTotalQuantity = () => {
    const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    console.log('Cantidad total de productos en el carrito:', totalQuantity);
    return totalQuantity;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => {
  return useContext(CartContext);
};





