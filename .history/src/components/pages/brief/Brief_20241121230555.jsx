import { Box, Typography, Button, Divider } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Brief = () => {
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start', // Cambié a 'flex-start' para que el contenido esté alineado al inicio
        justifyContent: 'center',
        minHeight: 'auto', // Ajusté esto para evitar que el contenido esté demasiado centrado
        padding: 3,
      }}
    >
      <Box
        sx={{
          padding: 3,
          width: { xs: "90%", sm: "80%", md: "450px" },
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: 3,
          marginTop: 0, // Se ha puesto 0 para que esté aún más cerca del navbar
          marginBottom: 6,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
            fontWeight: "600",
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
            textAlign: "center",
          }}
        >
          Resumen de la Compra
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6" sx={{ color: "#999", textAlign: "center" }}>
            Tu carrito está vacío.
          </Typography>
        ) : (
          <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            {cart.map((product) => (
              <Box key={product.cartItemId} sx={{ marginBottom: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ fontWeight: "600", color: "#333" }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", fontSize: "14px" }}>
                    ${product.price} x {product.quantity}
                  </Typography>
                </Box>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
              </Box>
            ))}

            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "600", color: "#333" }}>
                Total: <span style={{ color: "#003366" }}>${getTotal().toFixed(2)}</span> {/* Azul marino */}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "16px",
                  marginTop: 2,
                  borderRadius: "8px",
                  backgroundColor: "#003366", // Azul marino para el botón
                  "&:hover": {
                    backgroundColor: "#002244", // Azul marino más oscuro al hacer hover
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Brief;





