import ProductCard from "../../common/card/ProductCard"; // Asegúrate de que la ruta sea correcta
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ItemList = ({ items }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Listado de productos</Typography>
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
