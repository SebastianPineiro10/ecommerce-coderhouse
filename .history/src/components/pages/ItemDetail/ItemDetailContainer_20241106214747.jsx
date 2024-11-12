import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { useParams } from 'react-router-dom';
import { products } from '../../../products'; // Ruta de los productos
import ItemDetail from './ItemDetail';
import { useCart } from '../../../context/CartContext';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id.toString() === itemId);
    if (selectedProduct) {
      setItem(selectedProduct);
      setSelectedImage(selectedProduct.imageUrl);
    } else {
      console.error("Producto no encontrado");
    }
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
    <div>Cargando...</div>
  );
};

ItemDetailContainer.propTypes = {
  itemId: PropTypes.string.isRequired, // Validar que `itemId` es una cadena
};

export default ItemDetailContainer;






