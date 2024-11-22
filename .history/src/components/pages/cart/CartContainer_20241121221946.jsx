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
        padding: { xs: 3, sm: 4, md: 5 },
        backgroundColor: "#fafafa",
        borderRadius: "16px",
        boxShadow: 3,
        marginTop: 4,
        marginX: "auto",
        maxWidth: "1200px", // Limitar el ancho máximo para pantallas grandes
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 3,
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
          letterSpacing: "1px",
        }}
      >
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#777", textAlign: "center", flex: 1 }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ flex: 1 }}>
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  padding: { xs: "12px", sm: "16px" },
                  borderRadius: "12px", // Bordes más suaves
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra sutil
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)", // Sombra más intensa al pasar el mouse
                    transform: "scale(1.05)", // Escalado suave para los hover
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", width: "60%" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px", // Bordes redondeados
                      marginRight: 16,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      color: "#333",
                      fontSize: "16px",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <Typography variant="body1" sx={{ color: "#333", fontSize: "14px" }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 1,
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      padding: "8px 12px",
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

                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromCart(product.cartItemId)}
                    sx={{ marginTop: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {cart.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
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
                width: { xs: "100%", sm: "45%" }, // 100% en pantallas pequeñas
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
                width: { xs: "100%", sm: "45%" }, // 100% en pantallas pequeñas
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









