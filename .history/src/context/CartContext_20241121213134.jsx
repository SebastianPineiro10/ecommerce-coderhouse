import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  
  const generateCartItemId = () => `cart-${Date.now()}-${Math.random()}`;

  
  const addToCart = (product) => {
    
    const existingItem = cart.find(item => item.cartItemId === product.cartItemId);

    if (existingItem) {
      
      const totalQuantity = existingItem.quantity + 1; 

      
      if (totalQuantity <= product.stock) {
        setCart(prevCart => 
          prevCart.map(item => 
            item.cartItemId === product.cartItemId 
            ? { ...item, quantity: totalQuantity } 
            : item
          )
        );
        toast.success(`La cantidad de ${product.title} se ha actualizado a ${totalQuantity}`);
      } else {
        
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
    } else {
      
      if (product.stock > 0) {
        const newCartItem = { ...product, cartItemId: generateCartItemId(), quantity: 1 }; // Agregamos el producto con cantidad 1
        setCart(prevCart => [...prevCart, newCartItem]);
        toast.success(`${product.title} ha sido añadido al carrito`);
      } else {
        
        toast.error(`El producto ${product.title} está agotado.`);
      }
    }
  };

  
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.cartItemId !== cartItemId);
      toast.error("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;

    const item = cart.find(item => item.cartItemId === cartItemId);
    
    
    if (item && quantity <= item.stock) {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        );
        toast.info("Cantidad actualizada");
        return updatedCart;
      });
    } else {
      toast.error("No puedes agregar más de lo disponible en stock.");
    }
  };

  
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };


  const clearCart = () => {
    setCart([]);
    toast.success("Carrito vacío");
  };

 
  const startCheckout = () => {
    setIsCheckout(true);
  };

 
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
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useCart = () => useContext(CartContext);