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
        padding: { xs: 3, sm: 4 },
        backgroundColor: "#fafafa", // Fondo claro para dar sensación de limpieza
        borderRadius: "12px",
        boxShadow: 3,
        marginTop: 4,
        maxWidth: "900px", // Límite de ancho para no ocupar toda la pantalla
        margin: "auto", // Centramos el contenido
        height: "100vh", // Utilizamos toda la altura disponible
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Aseguramos que el contenido esté bien distribuido
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

      {/* Contenido del carrito */}
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#777", textAlign: "center", flex: 1 }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ flex: 1 }}>
          {cart.map((product) => (
            <Grid item xs={12} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "12px", // Bordes más redondeados para una apariencia más suave
                  backgroundColor: "#fff",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Sombra sutil
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)", // Sombra más profunda
                    transform: "scale(1.03)", // Más sutil para no ser tan exagerado
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", width: "60%" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginRight: 20, // Más espacio entre imagen y título
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
                      borderRadius: "4px",
                      padding: "8px 14px",
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

      {/* Resumen total y botones */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
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
                borderRadius: "8px",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.15)",
                  transform: "scale(1.02)",
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
                borderRadius: "8px",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.15)",
                  transform: "scale(1.02)",
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








