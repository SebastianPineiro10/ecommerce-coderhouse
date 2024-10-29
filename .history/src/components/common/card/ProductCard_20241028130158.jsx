import { Link } from 'react-router-dom'; // Importar Link
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './productcard.css';

const ProductCard = ({ title, price, stock, image, id }) => {
  return (
    <Box className="product-card">
      <img src={image} alt={title} />
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body1">Price: ${price}</Typography>
      <Typography variant="body2">Stock: {stock}</Typography>
      <Button
        component={Link} // Hacer que el botón sea un enlace
        to={`/item/${id}`} // Usar el ID del producto en la ruta
        variant="contained"
        color="primary"
        sx={{ marginTop: '8px' }}
      >
        Ver Detalles
      </Button>
    </Box>
  );
};

export default ProductCard;


