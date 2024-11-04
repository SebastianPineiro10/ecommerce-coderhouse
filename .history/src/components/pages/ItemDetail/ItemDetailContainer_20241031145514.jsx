import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../../../products'; // Asegúrate de que la ruta sea correcta
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id.toString() === itemId);
    setItem(selectedProduct);
    setSelectedImage(selectedProduct?.imageUrl); // Imagen principal al cargar
  }, [itemId]);

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const addToCart = () => {
    console.log(`Producto ${item.title} añadido al carrito.`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {item ? (
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={item.title}
              sx={{ objectFit: "contain", height: 'auto', maxHeight: '250px', borderRadius: '8px' }}
            />
            <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 1 }}>
              {[item.imageUrl, item.imageUrl, item.imageUrl].map((img, index) => (
                <Grid item key={index}>
                  <CardMedia
                    component="img"
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleThumbnailClick(img)}
                    sx={{
                      width: '30px',
                      height: '30px',
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
      ) : (
        <Typography variant="h6">Cargando...</Typography>
      )}
    </Box>
  );
};

export default ItemDetailContainer;




