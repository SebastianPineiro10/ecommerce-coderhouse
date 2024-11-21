import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, getTotalQuantity, startCheckout } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (prodId) => {
    removeFromCart(prodId);
  };

  const handleQuantityChange = (prodId, quantity, stock) => {
    if (quantity >= 1 && quantity <= stock) {
      updateQuantity(prodId, quantity);
    }
  };

  const incrementQuantity = (prodId, quantity, stock) => {
    if (quantity < stock) {
      updateQuantity(prodId, quantity + 1);
    }
  };

  const decrementQuantity = (prodId, quantity) => {
    if (quantity > 1) {
      updateQuantity(prodId, quantity - 1);
    }
  };

  const handleCheckout = () => {
    startCheckout();
    navigate('/checkout');
  };

  const handleGoToBrief = () => {
    navigate('/brief');
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

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => decrementQuantity(product.cartItemId, product.quantity)}>-</IconButton>
                    <Typography variant="body1" sx={{ marginX: 2 }}>
                      {product.quantity} / {product.stock} disponible(s)
                    </Typography>
                    <IconButton onClick={() => incrementQuantity(product.cartItemId, product.quantity, product.stock)}>+</IconButton>
                  </Box>

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
            sx={{ padding: "12px", fontSize: "16px", width: "350px", marginRight: 4 }}
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














