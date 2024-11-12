import { Box, Typography, Button, TextField } from "@mui/material";
import { useCart } from "../../../context/CartContext"; // Usamos el hook del carrito

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // Eliminar producto del carrito
  };

  const handleQuantityChange = (productId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(productId, newQuantity); // Actualizamos la cantidad
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Tu carrito</Typography>
      
      {cart.length === 0 ? (
        <Typography>No hay productos en el carrito.</Typography>
      ) : (
        cart.map((product) => (
          <Box key={product.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: 100, height: 100, objectFit: "contain", marginRight: 16 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2">Precio: ${product.price}</Typography>
              <TextField
                label="Cantidad"
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product.id, e)}
                sx={{ width: 60, marginRight: 2 }}
              />
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveFromCart(product.id)}
            >
              Eliminar
            </Button>
          </Box>
        ))
      )}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: ${getTotal().toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CartContainer;



