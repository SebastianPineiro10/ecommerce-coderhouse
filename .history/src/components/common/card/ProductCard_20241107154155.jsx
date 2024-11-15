import PropTypes from 'prop-types'; // Importar PropTypes
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {image && (
        <CardMedia
          component="img"
          src={image}
          alt={title}
          sx={{ width: 'auto', height: 'auto', maxHeight: 160, objectFit: 'contain', borderRadius: '4px' }}
        />
      )}
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">Precio: ${price}</Typography>
      <Link to={`/item/${id}`}>
        <Button variant="contained" sx={{ padding: '8px', width: '100%' }}>
          Ver detalles
        </Button>
      </Link>
    </Box>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default ProductCard;



