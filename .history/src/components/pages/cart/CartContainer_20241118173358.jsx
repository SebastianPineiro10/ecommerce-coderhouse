
import { useCart } from "../../../context/CartContext";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartContainer = () => {
  const { cart, updateQuantity, handleRemoveFromCart } = useCart();

  const handleQuantityChange = (id, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Box>
      {cart.length === 0 ? (
        <Typography>No hay productos en el carrito.</Typography>
      ) : (
        cart.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              border: "1px solid #ccc",
              marginBottom: 2,
              borderRadius: 4,
            }}
          >
            <Typography>{product.title}</Typography>
            <TextField
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e)}
              sx={{ width: 60 }}
            />
            <IconButton onClick={() => handleRemoveFromCart(product.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CartContainer;

