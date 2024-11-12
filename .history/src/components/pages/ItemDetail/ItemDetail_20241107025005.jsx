import { Box, Typography, Button } from "@mui/material";

const ItemDetail = ({ item }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{item.title}</Typography>
      <img src={item.imageUrl} alt={item.title} style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} />
      <Typography variant="body1">{item.description}</Typography>
      <Typography variant="h6">Precio: ${item.price}</Typography>
      <Typography variant="body2">Stock: {item.stock}</Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Añadir al carrito
      </Button>
    </Box>
  );
};

export default ItemDetail;




