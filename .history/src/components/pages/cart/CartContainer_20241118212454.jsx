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
  };

  // Navegar al resumen
  const handleGoToBrief = () => {
    navigate('/brief');
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "10px", boxShadow: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}>
        Carrito de Compras
      </Typography>
      
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((product) => (
            <Grid item xs={12} md={6} key={`${product.id}-${product.boxSize}`}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                border: "1px solid #ddd", 
                padding: 2, 
                borderRadius: 2, 
                boxShadow: 3, 
                backgroundColor: "#fff", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                }
              }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", marginRight: 16 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>
                    {product.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ marginRight: 2, color: "#333", fontSize: "14px" }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: "4px", padding: "5px 10px" }}>
                    <IconButton onClick={() => decrementQuantity(product.id, product.boxSize, product.quantity)} sx={{ padding: "4px", color: "#333" }}>-</IconButton>
                    <Typography variant="body1" sx={{ marginX: 2, color: "#555" }}>
                      {product.quantity} / {product.stock} disponible(s)
                    </Typography>
                    <IconButton onClick={() => incrementQuantity(product.id, product.boxSize, product.quantity, product.stock)} sx={{ padding: "4px", color: "#333" }}>+</IconButton>
                  </Box>

                  <IconButton color="error" onClick={() => handleRemoveFromCart(product.id, product.boxSize)} sx={{ marginLeft: 2 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginRight: 2, fontWeight: "bold", color: "#333" }}>
          Total: ${getTotal().toFixed(2)}
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          ({getTotalQuantity()} productos)
        </Typography>
      </Box>

      {cart.length > 0 && (
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "12px", fontSize: "16px", width: "350px", marginRight: 4, borderRadius: "8px" }}
            onClick={handleGoToBrief}
          >
            Ver Resumen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ padding: "12px", fontSize: "16px", width: "350px", borderRadius: "8px" }}
            onClick={handleCheckout}
          >
            Finalizar compra
          </Button>
        </Box