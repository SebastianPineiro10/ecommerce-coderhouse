// ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../../products'; // Asegúrate de que la ruta sea correcta
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id.toString() === itemId);
    if (selectedProduct) {
      setItem(selectedProduct);
      setSelectedImage(selectedProduct.imageUrl);
    } else {
      console.error("Product not found");
    }
  }, [itemId]);

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const addToCart = () => {
    console.log(`Producto ${item.title} añadido al carrito.`);
  };

  return item ? (
    <ItemDetail 
      item={item} 
      selectedImage={selectedImage} 
      onThumbnailClick={handleThumbnailClick} 
      addToCart={addToCart} 
    />
  ) : (
    <div>Cargando...</div>
  );
};

export default ItemDetailContainer;




