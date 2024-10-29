import Box from '@mui/material/Box';
import ProductCard from '../../common/card/ProductCard';

const ItemList = ({ items }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <h4>Listado de productos</h4> {/* Título de la lista */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {items.map(({ id, title, price, imageUrl }) => (
          <ProductCard
            key={id}
            title={title}
            price={price}
            image={imageUrl}
            id={id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ItemList;
