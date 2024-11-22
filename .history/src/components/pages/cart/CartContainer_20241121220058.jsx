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
        padding: { xs: 2, sm: 3 }, // Ajuste de padding para pantallas pequeñas
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Fondo semi-transparente
        borderRadius: "10px",
        boxShadow: 3,
        backdropFilter: "blur(10px)", // Desenfoque sutil
        marginTop: 5, // Separación con el Navbar
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
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
        <Grid container spacing={2}>
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 6, // Más sombra para resaltar el producto
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)", // Menos escala para evitar el empalme
                    boxShadow: 12, // Más sombra al pasar el mouse
                    zIndex: 1, // Asegura que el producto se mantenga encima de otros elementos
                  },
                  marginBottom: 2, // Espaciado entre productos
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
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}
                  >
                    {product.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ marginRight: 2, color: "#333", fontSize: "14px" }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "4px",
                      padding: "5px 10px",
                    }}
                  >
                    <IconButton
                      onClick={() => decrementQuantity(product.cartItemId, product.quantity)}
                      sx={{ padding: "4px", color: "#333" }}
                    >
                      -
                    </IconButton>
                    <Typography variant="body1" sx={{ marginX: 2, color: "#555" }}>
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
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" }, // Cambiar la dirección de los botones en pantallas pequeñas
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px",
              fontSize: "16px",
              width: { xs: "100%", sm: "350px" }, // Ancho dinámico para dispositivos pequeños y grandes
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
              width: { xs: "100%", sm: "350px" }, // Ancho dinámico para dispositivos pequeños y grandes
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





