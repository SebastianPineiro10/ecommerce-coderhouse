import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onViewDetails }) => {
  const { title, price, imageUrl } = product;

  return (
    <Box sx={{ border: '1px solid #ddd', padding: 2, marginBottom: 2 }}>
      <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">${price}</Typography>
      <Button onClick={() => onViewDetails(product)}>Ver detalles</Button>
    </Box>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ProductCard;


