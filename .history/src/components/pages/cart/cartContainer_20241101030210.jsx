import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CartContainer = ({ cartItems }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Tus productos añadidos</Typography>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <Typography key={item.id}>{item.title}</Typography>
        ))
      ) : (
        <Typography>No hay productos en el carrito.</Typography>
      )}
      <Link to="/checkout" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Finalizar compra
        </Button>
      </Link>
    </Box>
  );
};

export default CartContainer;


