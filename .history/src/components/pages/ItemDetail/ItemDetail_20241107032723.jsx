import { Box, Typography, Button, Grid } from '@mui/material';

const ItemDetail = ({ item, addToCart }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '8px' }} 
          />
        </Grid>

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
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart(item)}
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




