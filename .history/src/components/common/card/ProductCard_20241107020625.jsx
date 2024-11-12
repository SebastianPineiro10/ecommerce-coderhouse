import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onViewDetails }) => {
  const { title, price, imageUrl, description, id } = product;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={imageUrl}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography variant="h5">${price}</Typography>
      </CardContent>
      <Box sx={{ padding: 1 }}>
        <Button onClick={() => onViewDetails(product)} fullWidth variant="contained">
          Ver detalles
        </Button>
      </Box>
    </Card>
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



