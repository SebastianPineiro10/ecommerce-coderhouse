import { Box, Typography, Button, Grid } from "@mui/material";
import { useState } from "react";

const ItemDetail = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(item.imageUrl); // Para cambiar la imagen seleccionada

  const handleThumbnailClick = (image) => {
    setSelectedImage(image); // Cambiar la imagen cuando se hace clic en la miniatura
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Imagen principal */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={selectedImage} // Imagen seleccionada
              alt={item.title}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              {item.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${item.title}-thumb-${index}`}
                  onClick={() => handleThumbnailClick(image)} // Cambiar imagen al hacer clic
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: selectedImage === image ? "2px solid #1976d2" : "none",
                    transition: "border 0.3s ease",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Detalles del producto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {item.title}
          </Typography>
          <Typography variant="h6" sx={{ marginY: 2 }}>
            ${item.price}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {item.description}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Stock: {item.stock}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              '&:hover': {
                backgroundColor: "#1565c0",
              }
            }}
            onClick={() => addToCart(item)}
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetail;




