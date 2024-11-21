import PropTypes from 'prop-types'; 
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Asegúrate de importar el hook del CartContext
import './productcard.css'; 

const ProductCard = ({ title, price, image, id, stock }) => {
  const { addToCart } = useCart(); // Usamos el hook para acceder a la función addToCart

  const handleAddToCart = () => {
    // Creamos un objeto para representar el producto con la cantidad seleccionada
    const product = { title, price, image, id, stock, quantity: 1 };
    addToCart(product); // Llamamos a la función de addToCart para agregar el producto
  };

  return (
    <Box className="product-card" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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

        {/* Botón para agregar al carrito */}
        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '6px',
            backgroundColor: '#28a745',
            color: 'white',
            marginTop: '8px',
            '&:hover': {
              backgroundColor: '#218838',
            },
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </Box>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired, // Agregamos el stock como prop
};

export default ProductCard;
