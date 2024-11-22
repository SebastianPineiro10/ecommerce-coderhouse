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
        padding: { xs: 4, sm: 5 },  // Espaciado mayor en pantallas pequeñas
        backgroundColor: "#fafafa", // Fondo claro para dar sensación de limpieza
        borderRadius: "16px", // Bordes más redondeados para dar un toque más elegante
        boxShadow: 3,
        marginTop: 4,
        marginX: "auto", // Centrar el contenido horizontalmente
        maxWidth: "1000px", // Ajuste el ancho máximo para dispositivos grandes
        height: "auto", // Dejar que el contenedor ajuste su tamaño según el contenido
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Asegurar que el contenido esté alineado hacia arriba
        gap: 3, // Espaciado entre los bloques
        marginBottom: 4, // Separación con el footer
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
        <Grid container spacing={4} sx={{ flex: 1 }}>
          {cart.map((product) => (
            <Grid item xs={12} key={product.cartItemId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  padding: "16px", // Ajustamos el padding para no hacerlos tan grandes
                  borderRadius: "16px", // Bordes más pronunciados
                  backgroundColor: "#fff",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)", // Sombra más intensa
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.3)", // Sombra más profunda y oscura al hacer hover
                    transform: "scale(1.05)", // Efecto de escala para hacerlo más llamativo
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", width: "60%" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "80px", // Reducimos el tamaño de la imagen
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "12px", // Bordes redondeados para la imagen
                      marginRight: 20,
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
                      borderRadius: "8px", // Bordes redondeados
                      padding: "8px 12px", // Ajuste de padding para mejor apariencia
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
                borderRadius: "12px", // Bordes redondeados en botones
                boxShadow: 3,
                "&:hover": {
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Sombra más prominente al hacer hover
                  transform: "scale(1.05)", // Animación suave
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
                borderRadius: "12px", // Bordes redondeados en botones
                boxShadow: 3,
                "&:hover": {
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Sombra más prominente
                  transform: "scale(1.05)", // Animación suave
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












