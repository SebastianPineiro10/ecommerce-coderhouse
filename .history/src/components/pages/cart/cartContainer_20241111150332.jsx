import { useCart } from "../../../context/CartContext"; // Usamos el contexto
import { Link } from "react-router-dom";
import { CardMedia, Button, Typography } from "@mui/material";

const CartContainer = () => {
  const { cart, resetCart, removeFromCart, getTotalAmount } = useCart(); // Obtenemos funciones del contexto
  const totalEnElCarrito = getTotalAmount(); // Total del carrito

  return (
    <div>
      <h1>Tu Carrito</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cart.map((product) => (
          <div
            key={product.id}
            style={{
              border: "2px solid black",
              width: "300px",
              marginBottom: "10px",
              padding: "10px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {product.image && (
              <CardMedia
                component="img"
                src={product.image} // Usamos la imagen del producto
                alt={product.title}
                sx={{ width: 50, height: 50, objectFit: 'contain', borderRadius: '4px' }}
              />
            )}
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">Cantidad: {product.quantity}</Typography>
              <Typography variant="body2" style={{ color: 'green' }}>Precio: ${product.price}</Typography>
            </div>
            <Button onClick={() => removeFromCart(product.id)}>Eliminar</Button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div>
          <button onClick={resetCart}>Limpiar carrito</button>
          <h2 style={{ color: "red" }}>
            El total a pagar es ${totalEnElCarrito.toFixed(2)}
          </h2>
          <Link to="/cart">Ver carrito</Link>
        </div>
      )}
    </div>
  );
};

export default CartContainer;



