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
    // Aquí puedes agregar la lógica para añadir el producto al carrito
    console.log(`Producto ${item.title} añadido al carrito.`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {item ? (
        <>
          <Typography variant="h4">{item.title}</Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Typography variant="body2">Precio: ${item.price}</Typography>
          <Typography variant="body2">Stock: {item.stock}</Typography>
          
          <CardMedia
            component="img"
            image={selectedImage}
            alt={item.title}
            sx={{ width: '300px', height: '300px', margin: '20px auto', display: 'block', borderRadius: '8px' }}
          />
          
          <Grid container spacing={2} justifyContent="center">
            {[item.imageUrl, item.imageUrl, item.imageUrl].map((img, index) => (
              <Grid item key={index}>
                <CardMedia
                  component="img"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(img)}
                  sx={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #333' : '1px solid #ddd',
                    transition: 'border 0.3s',
                  }}
                />
              </Grid>
            ))}
          </Grid>
          
          <Button variant="contained" color="primary" onClick={addToCart} sx={{ marginTop: 2 }}>
            Añadir al carrito
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" sx={{ marginTop: 2, marginLeft: 2 }}>
              Volver a la lista de productos
            </Button>
          </Link>
        </>
      ) : (
        <Typography variant="h6">Cargando...</Typography>
      )}
    </Box>
  );
};

export default ItemDetailContainer;




