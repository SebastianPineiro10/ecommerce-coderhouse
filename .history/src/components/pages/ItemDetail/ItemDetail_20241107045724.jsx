import { Box, Typography, Button, Grid, CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Asegúrate de que la configuración de Firebase esté correctamente importada
import { toast } from "sonner"; // Asegúrate de tener este paquete instalado, o usa otro paquete de notificaciones si prefieres

const ItemDetail = ({ itemId, addToCart }) => {
  const [item, setItem] = useState(null); // Estado para almacenar el producto
  const [selectedImage, setSelectedImage] = useState(''); // Imagen seleccionada para mostrar

  // Función para cargar el producto desde Firestore usando itemId
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const docRef = doc(db, "products", itemId); // Referencia al producto en Firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setItem(productData);  // Guardamos los datos del producto
          setSelectedImage(productData.images[0]); // Inicializamos la imagen principal con la primera imagen
        } else {
          console.log("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto: ", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);  // El hook se vuelve a ejecutar cuando cambia el `itemId`

  if (!item) return null;  // Si no hay producto, no renderizamos nada, evita mostrar el "Cargando..."

  // Función para manejar el clic en las miniaturas de imágenes
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Función para agregar al carrito y mostrar la notificación
  const handleAddToCart = () => {
    addToCart(item); // Llamada a la función del contexto para agregar el producto al carrito
    toast.success(`${item.title} ha sido añadido al carrito!`); // Notificación de éxito
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', gap: 4 }}>
      {/* Columna de Imágenes */}
      <Box sx={{ flex: 1, textAlign: 'center' }}>
        {/* Imagen principal */}
        <CardMedia
          component="img"
          src={selectedImage} // Imagen principal
          alt={item.title}
          sx={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: '8px',
            boxShadow: 3,
            marginBottom: 2,
          }}
        />

        {/* Miniaturas de imágenes */}
        <Grid container spacing={1} justifyContent="center">
          {item.images && item.images.map((img, index) => (
            <Grid item key={index}>
              <CardMedia
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(img)} // Cambia la imagen cuando se hace clic en la miniatura
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: selectedImage === img ? "2px solid #333" : "1px solid #ddd",
                  transition: "border 0.3s",
                  margin: 0.5,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Columna de Detalles del Producto */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {item.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {item.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>
          Precio: ${item.price}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Stock: {item.stock}
        </Typography>

        {/* Botón Añadir al carrito */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart} // Usamos el handleAddToCart para mostrar la notificación
          sx={{
            width: "100%",
            padding: "10px 0",
            fontWeight: "bold",
            marginTop: 2,
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#0066cc',
            },
          }}
        >
          Añadir al carrito
        </Button>
      </Box>
    </Box>
  );
};

export default ItemDetail;


