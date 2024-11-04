import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box className="product-card" sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: 2, textAlign: 'center',gridColumn: "rep" }}>
      {image && (
        <CardMedia
          component="img"
          src={image}
          alt={title}
          sx={{ width: '150px', height: '150px', margin: '0 auto', marginBottom: 2, borderRadius: '5px' }}
        />
      )}
      <Typography variant="h6">{title || 'Título no disponible'}</Typography>
      <Typography variant="body1">Precio: ${price}</Typography>
      <Button
        component={Link}
        to={`/item/${id}`}  // Redirige a la ruta de detalles del producto
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
