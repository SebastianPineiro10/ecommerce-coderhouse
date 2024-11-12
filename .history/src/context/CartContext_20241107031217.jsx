import { useCart } from "../../../context/CartContext";
import { Box, Typography, Button, Grid, Divider, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CartContainer = () => {
  const { cart, removeFromCart, getTotal, getTotalQuantity } = useCart();
  console.log(cart);  // Agrega este log para ver los productos en el carrito

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Carrito de Compras
      </Typography>
      {/* Renderiza los productos en el carrito */}
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ccc", padding: 2, borderRadius: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: 16 }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      {item.quantity} x ${item.price}
                    </Typography>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ marginY: 2 }} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 2, textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total: ${getTotal()}
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Ir a pagar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartContainer;


