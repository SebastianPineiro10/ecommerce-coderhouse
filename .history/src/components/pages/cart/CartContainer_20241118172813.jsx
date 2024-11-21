
import { useCart } from "../../../context/CartContext";
import PropTypes from "prop-types";
import { Box, Typography, IconButton, TextField, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartContainer = () => {
  const { cart, updateQuantity, handleRemoveFromCart } = useCart();

  const handleQuantityChange = (cartItemId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(cartItemId, newQuantity);
  };

  return (
    <Grid container spacing={2}>
      {cart.map((product) => (
        <Grid item xs={12} md={6} key={product.cartItemId}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: 16,
                }}
              />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Stock disponible: {product.stock}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                ${product.price} x {product.quantity}
              </Typography>

              <TextField
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product.cartItemId, e)}
                sx={{ width: 60, marginRight: 2 }}
                inputProps={{
                  min: 1,
                  max: product.stock,
                  style: { textAlign: "center" },
                }}
              />

              <IconButton color="error" onClick={() => handleRemoveFromCart(product.cartItemId)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

CartContainer.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default CartContainer;
