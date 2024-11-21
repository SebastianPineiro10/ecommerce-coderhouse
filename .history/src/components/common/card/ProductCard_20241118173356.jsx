
import PropTypes from "prop-types";
import { useCart } from "../../../context/CartContext";
import { Box, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <Typography variant="h6">{product.title}</Typography>
      <Typography>Precio: ${product.price}</Typography>
      <Button
        variant="contained"
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
        sx={{ marginTop: 2 }}
      >
        {product.stock === 0 ? "Sin stock" : "Añadir al carrito"}
      </Button>
    </Box>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ProductCard;








