import { Box, Typography, Button, Grid } from '@mui/material';

const ItemDetail = ({ item, addToCart }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Imagen principal del producto */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            />
          </Box>
        </Grid>

        {/* Detalles del producto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
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
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={() => addToCart(item)} // Al hacer clic se añade al carrito
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetail;





