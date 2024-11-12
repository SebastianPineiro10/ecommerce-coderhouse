import { Box, Typography, Button, Grid } from "@mui/material";

const ItemDetail = ({ item, selectedImage, onThumbnailClick, addToCart }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Columna de la imagen principal y miniaturas */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Imagen principal */}
            <img
              src={selectedImage}
              alt={item.title}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "8px",
                marginBottom: "16px"
              }}
            />
            {/* Miniaturas de las imágenes */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {item.images && item.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${item.title}-thumb-${index}`}
                  onClick={() => onThumbnailClick(image)}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: selectedImage === image ? "2px solid #1976d2" : "none",
                    transition: "border 0.3s ease"
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Columna de los detalles del producto */}
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

          {/* Botón de añadir al carrito */}
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
            onClick={addToCart}
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetail;





