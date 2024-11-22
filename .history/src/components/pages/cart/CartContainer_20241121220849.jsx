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
        padding: { xs: 3, sm: 4 }, // Aumentar padding
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: 5,
        marginTop: 5,
        maxWidth: "1200px", // Limitar el ancho máximo
        margin: "auto", // Centrar el contenido
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          fontWeight: "bold",
          color: "#222", // Color oscuro para un buen contraste
          textAlign: "center",
        }}
      >
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#777", textAlign: "center" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((product) => (
            <Grid item xs={12} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row", // Mantener todo en fila
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: 2,
                  backgroundColor: "#fafafa", // Color de fondo suave
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: 10,
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", width: "60%" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: 20,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: 1,
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666", fontSize: "14px" }}>
                      ${product.price} x {product.quantity}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "4px",
                      padding: "5px 15px",
                      marginRight: 3,
                    }}
                  >
                    <IconButton
                      onClick={() => decrementQuantity(product.cartItemId, product.quantity)}
                      sx={{ padding: "4px", color: "#333" }}
                    >
                      -
                    </IconButton>
                    <Typography variant="body1" sx={{ color: "#555", marginX: 1 }}>
                      {product.quantity} / {product.stock} disponible(s)
                    </Typography>
                    <IconButton
                      onClick={() => incrementQuantity(product.cartItemId, product.quantity, product.stock)}
                      sx={{ padding: "4px", color: "#333" }}
                    >
                      +
                    </IconButton>
                  </Box>

                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromCart(product.cartItemId)}
                    sx={{ marginLeft: 2 }}
                  >
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
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px",
              fontSize: "16px",
              width: { xs: "100%", sm: "350px" },
              marginBottom: { xs: 2, sm: 0 },
              marginRight: { sm: 4 },
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
              width: { xs: "100%", sm: "350px" },
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







