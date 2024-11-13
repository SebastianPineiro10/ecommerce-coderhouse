import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner"; // Asegúrate de tener esta librería instalada

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // El carrito es un arreglo de productos

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    // Verificamos si el producto ya existe en el carrito por su id único
    const isInCart = cart.some((item) => item.id === product.id); // Usamos `some` para verificar si ya existe

    if (isInCart) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // Sumamos la cantidad
          : item
      );
      setCart(updatedCart);
      toast.success(`Cantidad de ${product.title} actualizada`);
    } else {
      // Si no existe, agregamos el producto al carrito
      const newProduct = { ...product, quantity }; // Añadimos la cantidad
      setCart([...cart, newProduct]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar un producto del carrito
  const removeById = (id) => {
    // Filtramos el carrito para eliminar el producto con el id correspondiente
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    // Toast para notificar la eliminación
    if (updatedCart.length === cart.length) {
      toast.warning("Producto no encontrado para eliminar");
    } else {
      toast.error("Producto eliminado del carrito");
    }
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Evitar cantidades negativas

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    toast.info("Cantidad actualizada");
  };

  // Obtener el total del carrito (precio total)
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Vaciar el carrito
  const resetCart = () => {
    setCart([]);
  };

  // Pasamos todas las funciones y el estado a través del contexto
  const data = {
    cart,
    addToCart,
    removeById,
    updateQuantity,
    resetCart,
    getTotalAmount,
    getTotalQuantity,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

// PropTypes para asegurar que `children` sea válido
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al contexto
export const useCart = () => {
  return useContext(CartContext);
};














