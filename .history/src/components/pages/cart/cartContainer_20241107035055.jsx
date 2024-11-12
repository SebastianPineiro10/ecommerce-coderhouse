import { Box, Typography, Button, Grid, IconButton, TextField, Card, CardContent, CardActions } from "@mui/material";
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
        <Grid container spacing={3}> {/* Contenedor de tarjetas */}
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  {/* Imagen del producto */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      marginRight: 16,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    {/* Nombre y precio del producto */}
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                      ${product.price} x {product.quantity}
                    </Typography>

                    {/* Campo de cantidad */}
                    <TextField
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.id, e)}
                      sx={{ width: 60, marginRight: 2 }}
                      inputProps={{ min: 1 }}
                    />
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  {/* Botón para eliminar producto */}
                  <IconButton color="error" onClick={() => handleRemoveFromCart(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
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

      {/* Botón para proceder al pago */}
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






