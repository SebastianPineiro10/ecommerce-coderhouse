import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { products } from '../../../products'; // Ruta de los productos
import { Box, Skeleton } from '@mui/material'; // Asegúrate de importar Skeleton desde MUI
import ItemDetail from './ItemDetail';
import { useCart } from '../../../context/CartContext';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id.toString() === itemId);

    // Simulamos un retraso para mostrar los Skeletons
    setTimeout(() => {
      if (selectedProduct) {
        setItem(selectedProduct);
        setSelectedImage(selectedProduct.imageUrl);
      } else {
        console.error("Producto no encontrado");
      }
    }, 1500); // Retraso de 1.5 segundos para simular carga
  }, [itemId]);

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart(item);
    }
  };

  return item ? (
    <ItemDetail
      item={item}
      selectedImage={selectedImage}
      onThumbnailClick={handleThumbnailClick}
      addToCart={handleAddToCart}
    />
  ) : (
    <Box sx={{ padding: 2 }}>
      {/* Aquí agregamos un Skeleton para simular la carga del producto */}
      <Skeleton variant="rectangular" width="100%" height={400} />
      <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
      <Skeleton variant="text" width="40%" sx={{ marginTop: 1 }} />
      <Skeleton variant="text" width="80%" sx={{ marginTop: 1 }} />
    </Box>
  );
};

ItemDetailContainer.propTypes = {
  itemId: PropTypes.string.isRequired, // Validar que `itemId` es una cadena
};

export default ItemDetailContainer;







