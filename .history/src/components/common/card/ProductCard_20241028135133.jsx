import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card">
      <img src={image} alt={title} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">Precio: ${price}</Typography>
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
