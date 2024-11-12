import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, CardMedia, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ItemDetail = ({ addToCart }) => {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const [item, setItem] = useState(null); // Guardamos el producto seleccionado
  const [selectedImage, setSelectedImage] = useState(null); // Guardamos la imagen seleccionada
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        // Obtén el producto desde Firestore
        const itemDoc = doc(db, 'products', id);
        const docSnapshot = await getDoc(itemDoc);

        if (docSnapshot.exists()) {
          const productData = docSnapshot.data();
          setItem(productData);
          setSelectedImage(productData.imageUrl); // Establece la primera imagen como seleccionada
        } else {
          console.log('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]); // Vuelve a cargar los datos si el id cambia

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
        <Skeleton variant="text" width="40%" sx={{ marginTop: 1 }} />
        <Skeleton variant="text" width="80%" sx={{ marginTop: 1 }} />
      </Box>
    );
  }

  if (!item) {
    return <Typography>No se encontró el producto.</Typography>;
  }

  // Función para cambiar la imagen principal cuando se haga clic en una miniatura
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        {/* Sección de las imágenes del producto */}
        <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
          <CardMedia
            component="img"
            image={selectedImage}
            alt={item.title}
            sx={{
              objectFit: 'contain',
              height: 'auto',
              maxHeight: '400px',
              borderRadius: '8px',
            }}
          />

          {/* Miniaturas de las imágenes */}
          <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 1 }}>
            {/* Aquí iteramos sobre las imágenes, por ahora las repetimos como ejemplo */}
            {[item.imageUrl, item.imageUrl, item.imageUrl].map((img, index) => (
              <Grid item key={index}>
                <CardMedia
                  component="img"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(img)} // Cambiar la imagen principal
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

        {/* Sección de detalles del producto */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">{item.title}</Typography>
          <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
            ${item.price}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {item.description}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Categoría: {item.category}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Stock: {item.stock}
          </Typography>

          {/* Botón para agregar al carrito */}
          <Button
            variant="contained"
            color="primary"
            onClick={addToCart}
            sx={{ marginTop: 3 }}
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetail;




