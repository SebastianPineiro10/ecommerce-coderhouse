import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, CardMedia, CircularProgress } from '@mui/material';
import { db } from "../../../firebaseConfig"; // Importa la configuración de Firebase
import { doc, getDoc } from "firebase/firestore"; // Métodos de Firestore

const ItemDetail = ({ addToCart }) => {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const [item, setItem] = useState(null); // Para almacenar los detalles del producto
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Obtener los detalles del producto desde Firestore
    const fetchItemDetails = async () => {
      try {
        console.log(`Buscando producto con ID: ${id}`); // Depuración
        const itemDoc = doc(db, 'products', id); // Obtener el documento usando el id
        const docSnapshot = await getDoc(itemDoc); // Obtener los datos de Firestore

        if (docSnapshot.exists()) {
          const productData = docSnapshot.data();
          setItem(productData); // Si existe, guarda los datos en el estado
          setSelectedImage(productData.imageUrl || ''); // Asignar la imagen principal como la seleccionada
          console.log("Producto encontrado:", productData); // Depuración
        } else {
          console.log("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      } finally {
        setLoading(false); // Después de cargar, actualiza el estado
      }
    };

    fetchItemDetails(); // Ejecutar la función de obtención de datos
  }, [id]); // Vuelve a cargar los datos si el id cambia

  if (loading) {
    return <CircularProgress />; // Muestra el spinner mientras se cargan los datos
  }

  if (!item) {
    return <Typography>No se encontró el producto.</Typography>; // Muestra un mensaje si no se encuentra el producto
  }

  // Función para cambiar la imagen seleccionada
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
          {/* Imagen principal del producto */}
          <CardMedia
            component="img"
            image={selectedImage || 'default_image_url'} // Usa una imagen por defecto si no hay imagen
            alt={item.title}
            sx={{
              objectFit: 'contain',
              height: 'auto',
              maxHeight: '400px', // Puedes ajustar el tamaño según tus necesidades
              borderRadius: '8px',
            }}
          />
          {/* Miniaturas de imágenes */}
          <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 1 }}>
            {item.images?.map((img, index) => (
              <Grid item key={index}>
                <CardMedia
                  component="img"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(img)}
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

export default ItemDetail;



