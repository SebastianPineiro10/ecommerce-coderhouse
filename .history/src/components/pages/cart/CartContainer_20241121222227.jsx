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
    <Box
      sx={{
        padding: { xs: 2, sm: 3 },
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        boxShadow: 3,
        backdropFilter: "blur(10px)",
        marginTop: 5,
        marginBottom: 5, // Separación del footer
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // Distribuir en columnas
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: 2,
                  borderRadius: "12px",
                  boxShadow: 6,
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", 
                    boxShadow: 12,
                    zIndex: 1,
                  },
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: 16,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                >
                  {product.title}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 2 }}>
                  <Typography variant="body1" sx={{ color: "#333" }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: "4px" }}>
                    <IconButton
                      onClick={() => decrementQuantity(product.cartItemId, product.quantity)}
                      sx={{ padding: "5px", color: "#333" }}
                    >
                      -
                    </IconButton>
                    <Typography variant="body1" sx={{ marginX: 2, color: "#555" }}>
                      {product.quantity} / {product.stock} disponible(s)
                    </Typography>
                    <IconButton
                      onClick={() => incrementQuantity(product.cartItemId, product.quantity, product.stock)}
                      sx={{ padding: "5px", color: "#333" }}
                    >
                      +
                    </IconButton>
                  </Box>
                </Box>

                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromCart(product.cartItemId)}
                  sx={{ marginTop: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Total: ${getTotal().toFixed(2)}
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          ({getTotalQuantity()} productos)
        </Typography>
      </Box>

      {cart.length > 0 && (
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px",
              fontSize: "16px",
              width: { xs: "100%", sm: "45%" },
              borderRadius: "8px",
            }}
            onClick={handleGoToBrief}
          >
            Ver Resumen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              padding: "12px",
              fontSize: "16px",
              width: { xs: "100%", sm: "45%" },
              borderRadius: "8px",
            }}
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











