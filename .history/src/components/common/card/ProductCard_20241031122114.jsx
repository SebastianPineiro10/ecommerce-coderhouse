import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './productcard.css';

const ProductCard = ({ title, price, image, id }) => {
  return (
    <Box
      className="product-card"
      sx={{
        maxWidth: 345,
        borderRadius: 3, // Bordes redondeados
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra sutil
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        textAlign: "center",
        padding: 2,
        margin: "16px",
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0", // Borde redondeado superior para la imagen
          }}
        />
      )}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, color: "#333" }}>
        {title || 'Título no disponible'}
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
        Precio: ${price}
      </Typography>
      <Button
        component={Link}
        to={`/item/${id}`}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: 2,
          backgroundColor: "#007BFF",
          color: "#FFFFFF",
          fontWeight: "bold",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
      >
        Ver Detalles
      </Button>
    </Box>
  );
};

export default ProductCard;
