
import PropTypes from "prop-types";
import { useCart } from "../context/CartProvider";
import { Box, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        textAlign: "center",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: 16,
        }}
      />
      <Typography variant="h6">{product.title}</Typography>
      <Typography variant="body1">Precio: ${product.price}</Typography>
      <Typography variant="body2">Stock: {product.stock}</Typography>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          padding: "12px",
          fontSize: "1rem",
          borderRadius: "6px",
          backgroundColor: product.stock > 0 ? "#007BFF" : "#ccc",
          color: "white",
          "&:hover": {
            backgroundColor: product.stock > 0 ? "#0056b3" : "#ccc",
          },
        }}
        disabled={product.stock === 0}
        onClick={() => addToCart(product)}
      >
        {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
      </Button>
    </Box>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;






