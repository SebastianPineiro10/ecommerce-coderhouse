import { Box, Typography, Button, Grid, IconButton, TextField } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, getTotalQuantity, startCheckout } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (prodId) => {
    removeFromCart(prodId);
  };

  const handleQuantityChange = (prodId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(prodId, newQuantity);
    }
  };

  const handleCheckout = () => {
    startCheckout(); // Cambiar el estado a checkout
    navigate('/checkout'); // Redirigir al formulario de compra
  };

  const handleGoToBrief = () => {
    navigate('/brief'); // Redirigir al resumen
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Carrito de Compras
      </Typography>
      
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((product) => (
            <Grid item xs={12} md={6} key={product.cartItemId}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ccc", padding: 2, borderRadius: 2, boxShadow: 2, marginBottom: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", marginRight: 16 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {product.title}
                  </Typography>
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
                    inputProps={{ min: 1, style: { textAlign: "center" } }}
                  />

                  <IconButton color="error" onClick={() => handleRemoveFromCart(product.cartItemId)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Total: ${getTotal().toFixed(2)}
        </Typography>
        <Typography variant="h6">({getTotalQuantity()} productos)</Typography>
      </Box>

      {cart.length > 0 && (
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "12px", fontSize: "16px", width: "350px", marginRight: 8 }}
            onClick={handleGoToBrief}
          >
            Ver Resumen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ padding: "12px", fontSize: "16px", width: "350px" }}
            onClick={handleCheckout}
          >
            Finalizar compra
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartContainer;











