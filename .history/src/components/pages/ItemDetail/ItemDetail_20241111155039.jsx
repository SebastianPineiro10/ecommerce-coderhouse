import { Box, Typography, Button, CardMedia } from "@mui/material";  
import { useState } from "react";  
import { useCart } from "../../../context/CartContext";  
import PropTypes from "prop-types";  

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart(); 
  const [selectedImage, setSelectedImage] = useState(item.imageUrl); 

  
  const handleAddToCart = () => {
    addToCart(item); 
  };

  
  const imagesToShow = item.additionalImages || [item.imageUrl]; 

  return (
    <Box sx={{
      padding: 3,
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      backgroundColor: '#fafafa',
      borderRadius: 10,
      boxShadow: 4,
      marginTop: 3,
    }}>
      
      <Box sx={{
        flex: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
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

        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {imagesToShow.slice(0, 3).map((image, index) => (  
            <CardMedia
              key={index}
              component="img"
              src={image}
              alt={`${item.title} ${index + 1}`}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'contain',
                cursor: 'pointer',
                borderRadius: '5px',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                }
              }}
              onClick={() => setSelectedImage(image)}  // Cambiar la imagen principal al hacer clic
            />
          ))}
        </Box>
      </Box>

      
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        margin: '10px'
      }}>
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
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


ItemDetail.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired, 
    stock: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    isUploaded: PropTypes.bool.isRequired,
    additionalImages: PropTypes.arrayOf(PropTypes.string),  
  }).isRequired,
};

export default ItemDetail;


