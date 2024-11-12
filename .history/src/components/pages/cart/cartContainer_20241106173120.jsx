import { useCart } from '../../../context/CartContext'; // Usar el contexto del carrito
import { Button, Typography, Box, TextField } from '@mui/material';

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart(); // Obtener información del carrito

  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Carrito de Compras</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Tu carrito está vacío</Typography>
      ) : (
        <>
          {cart.map((product) => (
            <Box key={product.id} sx={{ marginBottom: 3, padding: 3, border: '1px solid #ddd', borderRadius: '10px' }}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">Precio: ${product.price}</Typography>
              <Typography variant="body1">
                Cantidad: 
                <TextField
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  sx={{ width: '60px', marginLeft: '8px' }}
                />
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => handleRemove(product.id)}>
                Eliminar
              </Button>
            </Box>
          ))}
          <Typography variant="h5">Total: ${getTotal()}</Typography>
        </>
      )}
    </Box>
  );
};

export default CartContainer;



