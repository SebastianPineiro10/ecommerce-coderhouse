import { Box, Typography, Button, Grid, IconButton, TextField } from "@mui/material";
import { useCart } from "../../../context/CartContext"; // Usamos el hook del carrito
import { Delete as DeleteIcon } from "@mui/icons-material"; // Para el ícono de eliminar

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, getTotalQuantity } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // Eliminar producto del carrito
  };

  const handleQuantityChange = (productId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(productId, newQuantity); // Actualizamos la cantidad
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
        <Grid container spacing={2}> {/* Container con espacio entre productos */}
          {cart.map((product) => (
            <Grid item xs={12} md={6} key={product.id}> {/* Se asegura que cada producto esté en su propia tarjeta */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 2, // Sombra para separar los productos
                  marginBottom: 2, // Separar cada producto
                }}
              >
                {/* Imagen y título del producto */}
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

                {/* Detalles del producto: cantidad y precio */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  {/* Campo para editar cantidad */}
                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, e)}
                    sx={{ width: 60, marginRight: 2 }}
                  />
                  {/* Botón para eliminar producto */}
                  <IconButton onClick={() => handleRemoveFromCart(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Resumen del carrito */}
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





