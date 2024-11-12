import { useCart } from '../../../context/CartContext'; // Usar el contexto del carrito
import { Button, Typography, Box, TextField } from '@mui/material';
import { toast } from 'sonner'; // Si deseas mostrar notificaciones

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart(); // Obtener información del carrito

  // Manejar cambio de cantidad
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return; // Evitar valores negativos o 0
    updateQuantity(productId, quantity);
    toast.success('Cantidad actualizada con éxito');
  };

  // Manejar eliminación del producto
  const handleRemove = (productId) => {
    removeFromCart(productId);
    toast.error('Producto eliminado del carrito'); // Mostrar notificación de eliminación
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Carrito de Compras</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Tu carrito está vacío</Typography>
      ) : (
        <>
          {cart.map((product) => (
            <Box key={product.id} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">Precio: ${product.price}</Typography>
              <Typography variant="body1">
                Cantidad:
                <TextField
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                  sx={{ width: '60px', marginLeft: '8px', padding: '10px' }} // Aseguramos que el padding sea correcto
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


