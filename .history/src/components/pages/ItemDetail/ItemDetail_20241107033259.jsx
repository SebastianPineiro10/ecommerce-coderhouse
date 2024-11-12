import { Box, Typography, Button, Grid } from '@mui/material';

// El componente recibe las props: `item` (producto) y `addToCart` (función para agregar al carrito)
const ItemDetail = ({ item, addToCart }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Imagen principal */}
        <Grid item xs={12} md={6}>
          <img 
            src={item.imageUrl} // Usamos `imageUrl` desde las props del producto
            alt={item.title}    // Usamos `title` desde las props del producto
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'contain',
              borderRadius: '8px'
            }} 
          />
        </Grid>

        {/* Detalles del producto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {item.title} {/* Usamos `title` desde las props */}
          </Typography>
          <Typography variant="h6" sx={{ marginY: 2 }}>
            ${item.price} {/* Usamos `price` desde las props */}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {item.description} {/* Usamos `description` desde las props */}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart(item)}  // Llamamos a la función `addToCart` que viene por props
            sx={{
              padding: '12px 24px',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              }
            }}
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetail;




