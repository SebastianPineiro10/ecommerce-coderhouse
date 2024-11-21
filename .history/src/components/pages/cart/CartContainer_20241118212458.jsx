import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, getTotalQuantity, startCheckout } = useCart();
  const navigate = useNavigate();

  // Manejo de la eliminación de productos
  const handleRemoveFromCart = (prodId, boxSize) => {
    removeFromCart(prodId, boxSize);
  };

  // Incrementar cantidad del producto
  const incrementQuantity = (prodId, boxSize, quantity, stock) => {
    if (quantity < stock) {
      updateQuantity(prodId, boxSize, quantity + 1);
    }
  };

  // Disminuir cantidad del producto
  const decrementQuantity = (prodId, boxSize, quantity) => {
    if (quantity > 1) {
      updateQuantity(prodId, boxSize, quantity - 1);
    }
  };

  // Manejo de la finalización de compra
  const handleCheckout = () => {
    startCheckout();
    navigate('/checkout');

