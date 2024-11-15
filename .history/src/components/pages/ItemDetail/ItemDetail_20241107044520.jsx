import { Box, Typography, Button, Grid, CardMedia, Paper } from "@mui/material";
import { useState } from "react";

const ItemDetail = ({ item, addToCart }) => {
  const [selectedImage, setSelectedImage] = useState(item.imageUrl);

  // Función para cambiar la imagen principal al hacer clic en una miniatura
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', gap: 4 }}>
      {/* Columna de Imágenes */}
      <Box sx={{ flex: 1, textAlign: 'center' }}>
        <CardMedia
          component="img"
          src={selectedImage}
          alt={item.title}
          sx={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: '8px',
            boxShadow: 3,
            marginBottom: 2,
          }}
        />

        <Grid container spacing={1} justifyContent="center">
          {/* Miniaturas de imágenes */}
          {[item.imageUrl, item.imageUrl, item.imageUrl].map((img, index) => (
            <Grid item key={index}>
              <CardMedia
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(img)}
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: selectedImage === img ? "2px solid #333" : "1px solid #ddd",
                  transition: "border 0.3s",
                  margin: 0.5,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Columna de Detalles del Producto */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {item.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {item.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>
          Precio: ${item.price}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Stock: {item.stock}
        </Typography>

        {/* Botón Añadir al carrito */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(item)}
          sx={{
            width: "100%",
            padding: "10px 0",
            fontWeight: "bold",
            marginTop: 2,
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#0066cc',
            },
          }}
        >
          Añadir al carrito
        </Button>
      </Box>
    </Box>
  );
};

export default ItemDetail;



