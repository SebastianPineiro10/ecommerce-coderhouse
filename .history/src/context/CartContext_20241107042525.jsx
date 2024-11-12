import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { db } from "../firebaseConfig"; // Importa la configuración de Firebase
import { doc, setDoc, getDoc } from "firebase/firestore";

// Creamos el contexto del carrito
const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);  // Aquí agregamos el usuario para asociar el carrito a cada usuario
  
  // Usualmente, el estado `user` podría ser gestionado por Firebase Auth. Asumimos que ya tienes un método para autenticar a los usuarios.
  useEffect(() => {
    // Aquí obtienes el usuario autenticado, si existe
    // Si no tienes Firebase Auth implementado, este paso no es necesario
    // setUser(firebaseUser);  // Usuario autenticado
  }, []);

  // Función para cargar el carrito de Firestore cuando el usuario se autentica
  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        const cartRef = doc(db, "carts", user.uid); // Documento único para cada usuario
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []); // Cargar los productos en el carrito
        }
      };

      loadCart(); // Cargar carrito cuando se obtiene el usuario
    }
  }, [user]);

  // Función para actualizar el carrito en Firestore
  const updateCartInFirestore = async (updatedCart) => {
    if (user) {
      try {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: updatedCart }); // Actualizamos el carrito en Firestore
        toast.success("Carrito actualizado");
      } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        toast.error("Error al actualizar el carrito");
      }
    }
  };

  // Agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        updateCartInFirestore(updatedCart); // Actualizamos el carrito en Firestore
        toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
        return updatedCart;
      }
      // Si el producto no está en el carrito, lo agregamos
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      updateCartInFirestore(updatedCart); // Actualizamos el carrito en Firestore
      toast.success(`${product.title} ha sido añadido al carrito`); // Notificación
      return updatedCart;
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      updateCartInFirestore(updatedCart); // Actualizamos el carrito en Firestore
      toast.error("Producto eliminado del carrito"); // Notificación
      return updatedCart;
    });
  };

  // Actualizar cantidad de producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item // Evitar cantidades negativas
      );
      updateCartInFirestore(updatedCart); // Actualizamos el carrito en Firestore
      toast.info("Cantidad actualizada"); // Notificación
      return updatedCart;
    });
  };

  // Obtener total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener la cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Validación de las props para el componente CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};
