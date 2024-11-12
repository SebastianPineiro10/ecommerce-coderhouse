import { Box, Typography, Button, CardMedia } from "@mui/material";
import { useState } from "react";
import { useCart } from "../../../context/CartContext";  // Importa el hook del contexto de carrito

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart(); // Obtén la función addToCart del contexto de carrito
  const [selectedImage, setSelectedImage] = useState(item.imageUrl); // Imagen seleccionada para mostrar

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    addToCart(item); // Agregar al carrito
  };

  return (
    <Box sx={{
      padding: 5,  // Aumentar el padding para separar del navbar
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      backgroundColor: '#fafafa',
      borderRadius: 5,
      boxShadow: 4,
      marginTop: 3,  // Espacio extra para separar de cualquier navbar o elementos superiores
    }}>
      {/* Columna de Imágenes */}
      <Box sx={{
        flex: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Imagen principal */}
        <CardMedia
          component="img"
          src={selectedImage}
          alt={item.title}
          sx={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: '10px',
            boxShadow: 5,
            marginBottom: 3,
          }}
        />
      </Box>

      {/* Columna de Detalles del Producto con Fondo Transparente */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
      }}>
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
          borderRadius: '10px',
          padding: 3,
          boxShadow: 2,
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            color: '#333'
          }}>
            {item.title}
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: 2,
            color: '#666',
            lineHeight: 1.6
          }}>
            {item.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{
            marginBottom: 2,
            fontWeight: 'bold'
          }}>
            Precio: ${item.price}
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: 2,
            color: '#777'
          }}>
            Stock disponible: {item.stock}
          </Typography>
        </Box>

        {/* Botón Añadir al carrito */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart} // Usamos el handleAddToCart para agregar al carrito
          sx={{
            width: "100%",
            padding: "12px 0",
            fontWeight: "bold",
            marginTop: 3,
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          Añadir al carrito
        </Button>
      </Box>
    </Box>
  );
};

export default ItemDetail;

