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
        padding: 5,
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 3,
        marginBottom: 4,
        height: "100vh", // Utiliza toda la altura de la pantalla
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
        <Grid container spacing={4} justifyContent="center">
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "16px",
                  padding: "16px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  height: "100%", // Asegura que el contenedor sea flexible
                  "&:hover": {
                    boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.3)",
                    transform: "scale(1.05)",
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
                    borderRadius: "12px",
                    marginBottom: "20px",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    color: "#333",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    textAlign: "center",
                    wordBreak: "break-word", // Permite que el texto se ajuste a múltiples líneas
                    overflow: "hidden", // Evita que el texto se desborde
                    textOverflow: "ellipsis", // Si el texto es demasiado largo, lo corta
                    marginBottom: "12px",
                  }}
                >
                  {product.title}
                </Typography>

                <Typography variant="body1" sx={{ color: "#333", fontSize: "14px", marginBottom: "12px" }}>
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
                    marginBottom: "12px",
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
            </Grid>
          ))}
        </Grid>
      )}

      {/* Resumen total y botones */}
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















