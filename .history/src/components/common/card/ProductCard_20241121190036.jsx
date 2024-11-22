import PropTypes from 'prop-types'; 
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ title, price, image, id,}) => {
  return (
    <Box 
      className="product-card" 
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {image && (
        <CardMedia
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: 160,
            objectFit: 'contain',
            borderRadius: '4px',
            marginBottom: '16px',
          }}
        />
      )}
      <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '8px' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'gray', marginBottom: '16px' }}>
        Precio: ${price}
      </Typography>
      
      
      <div className="product-card-content">
        <Link to={`/item/${id}`} style={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              backgroundColor: '#007BFF',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Ver detalles
          </Button>
        </Link>
      </div>
    </Box>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default ProductCard;

