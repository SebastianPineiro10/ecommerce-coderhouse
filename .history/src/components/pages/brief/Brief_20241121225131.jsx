import { Box, Typography, Button } from "@mui/material";
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
        padding: 4,
        width: { xs: "90%", sm: "80%", md: "450px" },
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: 3,
        marginTop: 4,
        marginBottom: 6,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: "600",
          color: "#333",
          fontFamily: "'Poppins', sans-serif",
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        Resumen de la Compra
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#999", textAlign: "center" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Box sx={{ padding: "16px", borderRadius: "12px", backgroundColor: "#f9f9f9", boxShadow: 2 }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 3,
              fontWeight: "500",
              color: "#333",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Total: <span style={{ color: "#ff7b00" }}>${getTotal().toFixed(2)}</span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "12px",
              backgroundColor: "#ff7b00",
              "&:hover": {
                backgroundColor: "#e06b00",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleCheckout}
          >
            Finalizar Compra
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Brief;

