
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; // Importamos PropTypes
import { toast } from "sonner"; // Importamos sonner para las notificaciones

// Creamos el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío al inicio

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    let isInCart = cart.some((el) => el.id === product.id); // booleano

    if (isInCart) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      let nuevoArray = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return {
            ...elemento,
            quantity: elemento.quantity + (product.quantity || 1), // Sumar la cantidad del producto
          };
        } else {
          return elemento;
        }
      });
      setCart(nuevoArray); // Actualizamos el carrito con el nuevo array
      toast.success(`${product.title} cantidad actualizada en el carrito`);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]); // Usamos 1 como cantidad por defecto si no tiene cantidad
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Función para eliminar un producto por su id
  const removeById = (id) => {
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    setCart(arrayFiltrado); // Actualizamos el carrito sin el producto eliminado
    toast.error("Producto eliminado del carrito");
  };

  // Función para restablecer (vaciar) el carrito
  const resetCart = () => {
    setCart([]); // Vaciar el carrito
    toast.success("Carrito vacío");
  };

  // Obtener la cantidad de un producto específico por su id
  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0; // Si el producto está, devolver su cantidad, sino 0
  };

  // Calcular el total del carrito (precio * cantidad)
  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => acc + elemento.price * elemento.quantity, 0);
    return total; // Total acumulado
  };

  // Datos que se proporcionan a través del contexto
  const data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalQuantity,
    getTotalAmount,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

// PropTypes para validar los props del proveedor
CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // `children` debe ser un nodo React
};

// Hook personalizado para consumir el contexto
export const useCart = () => {
  return useContext(CartContext);
};










