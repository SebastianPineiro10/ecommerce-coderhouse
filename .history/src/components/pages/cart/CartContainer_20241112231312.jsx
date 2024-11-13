import { Box, Typography, Button, Grid, IconButton, TextField } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, getTotalQuantity } = useCart();

  // Función para manejar la eliminación de productos
  const handleRemoveFromCart = (prodId) => {
    removeFromCart(prodId);
  };

  // Función para manejar el cambio de cantidad de un producto
  const handleQuantityChange = (prodId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(prodId, newQuantity); // Actualizamos la cantidad solo si es válida
    }
  };

  // Función para finalizar la compra
  const handleCheckout = () => {
    alert(`Total a pagar: $${getTotal().toFixed(2)} con ${getTotalQuantity()} productos`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Carrito de Compras
      </Typography>

      {/* Si el carrito está vacío */}
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {/* Mostrar cada producto del carrito */}
          {cart.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  marginBottom: 2,
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
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {product.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  {/* Input para cambiar la cantidad */}
                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, e)}
                    sx={{ width: 60, marginRight: 2 }}
                    inputProps={{
                      min: 1,
                      style: { textAlign: "center" },
                    }}
                  />

                  {/* Botón para eliminar producto */}
                  <IconButton color="error" onClick={() => handleRemoveFromCart(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Mostrar el total y la cantidad de productos */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Total: ${getTotal().toFixed(2)}
        </Typography>
        <Typography variant="h6">
          ({getTotalQuantity()} productos)
        </Typography>
      </Box>

      {/* Botón para finalizar la compra */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", padding: "12px", fontSize: "16px" }}
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










