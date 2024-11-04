import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Card sx={{ width: 250, margin: 2, boxShadow: 3 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" component="div">
          {title || 'Título no disponible'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/item/${id}`}
          variant="contained"
          color="primary"
          size="small"
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
