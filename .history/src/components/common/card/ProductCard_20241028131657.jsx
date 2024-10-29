import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card">
      <img src={image} alt={title} />
      <Typography variant="h6" gutterBottom>{title}</Typography> {/* Título del producto */}
      <Typography variant="body1">Price: ${price}</Typography> {/* Precio del producto */}
      <Button
        component={Link}
        to={`/item/${id}`} // Enlace a la página de detalles del producto
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
