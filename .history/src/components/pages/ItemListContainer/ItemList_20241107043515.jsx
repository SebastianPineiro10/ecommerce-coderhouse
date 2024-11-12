import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom"; // Para manejar la navegación
import PropTypes from "prop-types"; // Para validación de props

const ItemList = ({ items }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
      {items.map((product) => (
        <Card
          key={product.id}
          sx={{
            width: 250,
            marginBottom: 2,
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardMedia
            component="img"
            alt={product.title}
            height="200"
            image={product.imageUrl}
            sx={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
          />
          <CardContent sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              ${product.price}
            </Typography>
            <Button
              component={Link}
              to={`/product/${product.id}`}
              variant="contained"
              color="primary"
              fullWidth
            >
              Ver detalles
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Validación de las props
ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ItemList;


