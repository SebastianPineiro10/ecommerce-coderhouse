import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductCard from '../../common/card/ProductCard'; 

const ItemList = ({ items }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Listado de productos
      </Typography>
      <Box className="product-grid">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.imageUrl}
            id={product.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ItemList;

