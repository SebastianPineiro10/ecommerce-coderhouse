import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false);

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        let isInCart = cart.some((el) => el.id === product.id);

        if (isInCart) {
            const nuevoArray = cart.map((elemento) => {
                if (elemento.id === product.id) {
                    return {
                        ...elemento,
                        quantity: elemento.quantity + product.quantity,
                    };
                } else {
                    return elemento;
                }
            });
            setCart(nuevoArray);
            toast.success(`La cantidad de ${product.title} ha sido actualizada.`);
        } else {
            setCart([...cart, product]);
            toast.success(`${product.title} ha sido añadido al carrito.`);
        }
    };

    // Función para eliminar productos del carrito
    const removeFromCart = (cartItemId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(
                (item) => item.cartItemId !== cartItemId
            );
            toast.error("Producto eliminado del carrito");
            return updatedCart;
        });
    };

    // Función para actualizar la cantidad de un producto
    const updateQuantity = (cartItemId, quantity) => {
        if (quantity < 1) return;

        const item = cart.find((item) => item.cartItemId === cartItemId);

        if (item && quantity <= item.stock) {
            setCart((prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity }
                        : item
                );
                toast.info("Cantidad actualizada");
                return updatedCart;
            });
        } else {
            toast.error("No puedes agregar más de lo disponible en stock.");
        }
    };

    // Función para obtener el total de la compra
    const getTotal = () => {
        return cart.reduce(
            (total, item) => total + (item.price * item.quantity || 0),
            0
        );
    };

    // Función para obtener la cantidad total de productos en el carrito
    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCart([]);
        toast.success("Carrito vacío");
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
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotal,
                getTotalQuantity,
                clearCart,
                startCheckout,
                resetCheckout,
                isCheckout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook para consumir el CartContext
export const useCart = () => useContext(CartContext);









