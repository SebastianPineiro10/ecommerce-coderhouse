import PropTypes from 'prop-types'; // Importar PropTypes
import { Box, Typography, Button, Grid, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const ItemDetail = ({ item, selectedImage, onThumbnailClick, addToCart }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
          <CardMedia
            component="img"
            image={selectedImage}
            alt={item.title}
            sx={{ objectFit: 'contain', height: 'auto', maxHeight: '200px', borderRadius: '8px' }}
          />
          <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 1 }}>
            {[item.imageUrl, item.imageUrl, item.imageUrl].map((img, index) => (
              <Grid item key={index}>
                <CardMedia
                  component="img"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => onThumbnailClick(img)}
                  sx={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #333' : '1px solid #ddd',
                    transition: 'border 0.3s',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">{item.title}</Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Typography variant="body2">Precio: ${item.price}</Typography>
          <Typography variant="body2">Stock: {item.stock}</Typography>
          <Button variant="contained" color="primary" onClick={addToCart} sx={{ marginTop: 2 }}>
            Añadir al carrito
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" sx={{ marginTop: 2, marginLeft: 2 }}>
              Volver a la lista de productos
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

// PropTypes para validar las propiedades
ItemDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  selectedImage: PropTypes.string.isRequired,
  onThumbnailClick: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ItemDetail;

