import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../common/card/productcard.css';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id.toString() === itemId);
    setItem(selectedProduct);
  }, [itemId]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        textAlign: "center",
      }}
    >
      {item ? (
        <>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
          )}
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            {item.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", marginTop: "8px" }}>
            {item.description}
          </Typography>
          <Typography variant="h6" sx={{ color: "#4CAF50", marginTop: "16px" }}>
            Precio: ${item.price}
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", marginBottom: "16px" }}>
            Stock: {item.stock}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Añadir al Carrito
          </Button>
        </>
      ) : (
        <Typography variant="h6">Cargando...</Typography>
      )}
    </Box>
  );
};

export default ItemDetailContainer;
