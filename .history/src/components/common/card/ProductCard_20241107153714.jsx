import PropTypes from 'prop-types'; // Importar PropTypes
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import './productcard.css'

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card" sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: 2, textAlign: 'center' }}>
      {image && (
        <CardMedia
          component="img"
          src={image}
          alt={title}
          sx={{ width: '100px', height: '50px', margin: '0 auto', marginBottom: 2, borderRadius: '5px' }}
        />
      )}
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">Precio: ${price}</Typography>
      <Link to={`/item/${id}`}>
        <Button variant="contained" sx={{ marginTop: 2 }}>
          Ver detalles
        </Button>
      </Link>
    </Box>
  );
};

// PropTypes para validar las propiedades
ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default ProductCard;


