import { createContext, useState, useContext } from "react";
import { toast } from "sonner"; // Asegúrate de tener 'sonner' instalado para las notificaciones

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Carrito vacío al inicio

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const isInCart = cart.some((el) => el.id === product.id);

    if (isInCart) {
      // Si el producto ya está, actualizamos la cantidad
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          const newQuantity = item.quantity + (product.quantity || 1); // Incrementamos la cantidad
          // Verificamos si la cantidad no excede el stock
          if (newQuantity <= product.stock) {
            return {
              ...item,
              quantity: newQuantity,
            };
          } else {
            toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
            return item; // No actualizamos la cantidad si excede el stock
          }
        }
        return item;
      });
      setCart(updatedCart); // Actualizamos el carrito
    } else {
      // Si el producto no está en el carrito, lo agregamos
      if (product.stock > 0) {
        setCart([...cart, { ...product, quantity: product.quantity || 1 }]); // Usamos 1 como valor por defecto si no tiene cantidad
        toast.success(`${product.title} ha sido añadido al carrito`);
      } else {
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  };

  // Función para eliminar un producto por su id
  const removeById = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Actualizamos el carrito sin el producto eliminado
    toast.error("Producto eliminado del carrito");
  };

  // Función para restablecer el carrito (vaciar)
  const resetCart = () => {
    setCart([]); // Dejar el carrito vacío
    toast.success("Carrito vacío");
  };

  // Obtener la cantidad total de un producto específico
  const getTotalQuantity = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0; // Si el producto está, devolver su cantidad, sino 0
  };

  // Calcular el total del carrito
  const getTotalAmount = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total; // Total acumulado
  };

  // El valor que se pasará al contexto
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

// Hook personalizado para usar el contexto
export const useCart = () => {
  return useContext(CartContext);
};

















