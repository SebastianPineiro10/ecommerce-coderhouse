import { useCart } from "../../../context/CartContext"; // Usamos el contexto
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid, CardMedia } from "@mui/material";
import { Delete } from "@mui/icons-material"; // Para el ícono de eliminar

const CartContainer = () => {
  const { cart, resetCart, removeFromCart, getTotalAmount } = useCart(); // Obtenemos funciones del contexto
  const totalEnElCarrito = getTotalAmount(); // Total del carrito

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Tu Carrito</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Tu carrito está vacío</p>
      ) : (
        <Grid container spacing={2}>
          {cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                {/* Usamos CardMedia para mostrar la imagen */}
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image } // Imagen predeterminada si no hay imagen
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cantidad: {product.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Precio: ${product.price * product.quantity}
                  </Typography>
                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => removeFromCart(product.id)}
                    fullWidth
                    variant="contained"
                    style={{ marginTop: "10px" }}
                  >
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={resetCart}
            style={{ marginBottom: "20px" }}
          >
            Limpiar carrito
          </Button>
          <h2 style={{ color: "green" }}>Total: ${totalEnElCarrito.toFixed(2)}</h2>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Proceder a pagar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartContainer;


