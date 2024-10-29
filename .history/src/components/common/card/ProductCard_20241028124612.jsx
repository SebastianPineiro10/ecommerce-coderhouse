import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductCard = ({ title, price, stock, image, id }) => {

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px', width: '200px' }}>
      <img src={imgSrc} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body1">Price: ${price}</Typography>
      <Typography variant="body2">Stock: {stock}</Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: '8px' }}>
        Ver Detalles
      </Button>
    </Box>
  );
};

export default ProductCard;
