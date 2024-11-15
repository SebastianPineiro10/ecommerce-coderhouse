import { Box, Typography, Button } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Brief = () => {
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout"); // Redirige a Checkout
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Resumen de la compra
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Total: ${getTotal().toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" sx={{ width: "100%" }} onClick={handleCheckout}>
            Finalizar Compra
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Brief;
