
import { Link } from 'react-router-dom'; // Para manejar la navegación
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* El enlace envuelve la imagen y el título */}
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl} // URL de la imagen del producto
          alt={product.name} // Nombre del producto como texto alternativo
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name} {/* Nombre del producto */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price} {/* Precio del producto */}
          </Typography>
        </CardContent>
      </Link>
      {/* Botón para agregar al carrito */}
      <Button variant="contained" color="primary">
        Agregar al carrito
      </Button>
    </Card>
  );
};

export default ProductCard;



