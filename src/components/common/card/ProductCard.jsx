import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card">
      {image && <img src={image} alt={title} />} {/* Solo muestra la imagen si existe */}
      <h3>{title || 'Título no disponible'}</h3> {/* Título que se muestra */}
      <p>Precio: ${price}</p> {/* Precio */}
      <Button
        component={Link}
        to={`/item/${id}`}
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
