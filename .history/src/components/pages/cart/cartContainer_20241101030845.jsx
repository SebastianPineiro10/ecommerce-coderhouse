import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CartContainer = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Tus productos añadidos</Typography>
      {/* Aquí podrías mostrar los productos del carrito */}
      <Link to="/checkout" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Finalizar compra
        </Button>
      </Link>
    </Box>
  );
};

export default CartContainer;

