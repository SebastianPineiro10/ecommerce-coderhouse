
import { Link } from 'react-router-dom';  // Importamos Link para la navegación
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import "./productcard.css"

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </Link>
      <Button variant="contained" color="primary">
        Agregar al carrito
      </Button>
    </Card>
  );
};

export default ProductCard;


