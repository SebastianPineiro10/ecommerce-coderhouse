import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'; 
import ProductCard from '../../common/card/ProductCard'; 

const ItemList = ({ items }) => {
  if (!Array.isArray(items)) {
    console.error('items debe ser un arreglo');
    return null;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" className="welcome-subtitle">
        Listado de productos
      </Typography>
      <Box className="product-grid">
        {items.length > 0 ? (
          items.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.imageUrl}
              id={product.id}
            />
          ))
        ) : (
          <Typography variant="body1">No hay productos disponibles</Typography>
        )}
      </Box>
    </Box>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,  
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ItemList;


