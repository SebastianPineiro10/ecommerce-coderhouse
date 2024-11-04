import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductCard from '../../common/card/ProductCard'; // Asegúrate de que la ruta sea correcta

const ItemList = ({ items }) => {
  return (
    <Box className="catalog">
      <Typography variant="h4" gutterBottom>
        Listado de productos
      </Typography>
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
  );
};

export default ItemList;


