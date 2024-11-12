import { Box, Typography, Button, Grid, Divider, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useCart } from '../../../context/CartContext';

const CartContainer = () => {
  const { cart, removeFromCart, getTotal, getTotalQuantity } = useCart();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Carrito de Compras
      </Typography>

      {/* Verificar si el carrito está vacío */}
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: 'gray' }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: 16 }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      {item.quantity} x ${item.price}
                    </Typography>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total ({getTotalQuantity()} productos):
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ${getTotal().toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" sx={{ width: '100%', padding: '12px', fontSize: '16px', fontWeight: 'bold' }}>
              Proceder al pago
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartContainer;



