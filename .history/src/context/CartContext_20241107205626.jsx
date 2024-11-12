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
    let isInCart = cart.some((el) => el.id === product.id && el.boxSize === product.boxSize);

    if (isInCart) {
      console.log("Producto ya está en el carrito, actualizando cantidad");
      setCart((prevCart) =>
        prevCart.map((elemento) =>
          elemento.id === product.id && elemento.boxSize === product.boxSize
            ? { ...elemento, quantity: elemento.quantity + product.quantity }
            : elemento
        )
      );
      toast.success(`La cantidad de ${product.title} ha sido actualizada`);
    } else {
      console.log("Producto nuevo añadido al carrito");
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
      toast.success(`${product.title} ha sido añadido al carrito`);
    }
  };

  // Eliminar producto del carrito usando id y boxSize
  const removeFromCart = (productId, boxSize) => {
    let arrayFiltrado = cart.filter((elemento) => !(elemento.id === productId && elemento.boxSize === boxSize));
    setCart(arrayFiltrado);
    toast.error("Producto eliminado del carrito");
  };

  // Restablecer el carrito
  const resetCart = () => {
    setCart([]);
  };

  // Obtener la cantidad total de un producto específico
  const getTotalQuantity = (id) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product ? product.quantity : 0;
  };

  // Obtener la cantidad total de todos los productos en el carrito
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener el monto total del carrito
  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => acc + elemento.price * elemento.quantity, 0);
    return total;
  };

  let data = {
    cart,
    addToCart,
    removeFromCart,
    resetCart,
    getTotalQuantity,
    getTotalAmount,
    getTotalItems,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);





