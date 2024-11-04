import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card">
      {image && <img src={image} alt={title} />} 
      <h3>{title || 'Título no disponible'}</h3> 
      <p>Precio: ${price}</p> 
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
