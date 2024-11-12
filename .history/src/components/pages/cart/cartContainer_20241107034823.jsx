import { Box, Typography, Button, Grid, IconButton, TextField } from "@mui/material";
import { useCart } from "../../../context/CartContext"; // Usamos el hook del carrito
import { Delete as DeleteIcon } from "@mui/icons-material"; // Para el ícono de eliminar

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, getTotalQuantity } = useCart();

  // Eliminar producto del carrito
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  // Cambiar la cantidad de un producto
  const handleQuantityChange = (productId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        // Grid container para cada producto individual
        <Grid container spacing={3}> 
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: 2,
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: 16,
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  ${product.price}
                </Typography>

                {/* Cambiar cantidad */}
                <TextField
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, e)}
                  sx={{ width: 60, marginBottom: 2 }}
                  inputProps={{ min: 1 }}
                />

                {/* Eliminar del carrito */}
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Total del carrito */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total ({getTotalQuantity()} productos):
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ${getTotal().toFixed(2)}
        </Typography>
      </Box>

      {/* Botón de pago */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", padding: "12px", fontSize: "16px", fontWeight: "bold" }}
        >
          Proceder al pago
        </Button>
      </Box>
    </Box>
  );
};

export default CartContainer;





