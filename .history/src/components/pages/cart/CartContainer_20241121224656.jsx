import { Box, Typography, Button, IconButton, Grid } from "@mui/material";
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
        padding: { xs: 4, sm: 5 },
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 4,
        marginBottom: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: "600",
          color: "#333",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Carrito de Compras
      </Typography>

      {/* Si el carrito está vacío */}
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#777", textAlign: "center" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.15)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
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
                      marginBottom: "15px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                      color: "#333",
                      fontSize: "16px",
                      fontFamily: "'Poppins', sans-serif",
                      textAlign: "center",
                      marginBottom: "12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", fontSize: "14px" }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  {/* Controles de cantidad */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 1,
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      marginTop: "15px",
                    }}
                  >
                    <IconButton
                      onClick={() => decrementQuantity(product.cartItemId, product.quantity)}
                      sx={{ padding: "6px", color: "#555" }}
                    >
                      -
                    </IconButton>
                    <Typography variant="body1" sx={{ marginX: 2, color: "#555" }}>
                      {product.quantity} / {product.stock} disponible(s)
                    </Typography>
                    <IconButton
                      onClick={() => incrementQuantity(product.cartItemId, product.quantity, product.stock)}
                      sx={{ padding: "6px", color: "#555" }}
                    >
                      +
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromCart(product.cartItemId)}
                    sx={{ padding: "6px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Resumen y botones */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#333" }}>
              Total: ${getTotal().toFixed(2)}
            </Typography>
            <Typography variant="h6" sx={{ color: "#555" }}>
              ({getTotalQuantity()} productos)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
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
                borderRadius: "12px",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.05)",
                },
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
                borderRadius: "12px",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleCheckout}
            >
              Finalizar compra
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartContainer;


















