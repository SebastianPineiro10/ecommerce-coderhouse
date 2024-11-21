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
        item.cartIte








