import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../../products'; // Asegúrate de que la ruta sea correcta
import ItemDetail from './ItemDetail';
import { useCart } from '../../../context/CartContext'; // Importar el contexto del carrito

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useCart(); // Usamos la función addToCart del contexto

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
      addToCart(item);  // Añadimos el producto al carrito
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

export default ItemDetailContainer;





