import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../productsc';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id.toString() === itemId);
    setItem(selectedProduct);
  }, [itemId]);

  return (
    <Box sx={{ padding: 2 }}>
      {item ? (
        <>
          <Typography variant="h4">{item.title}</Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Typography variant="body2">Precio: ${item.price}</Typography>
          <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100%' }} />
        </>
      ) : (
        <Typography variant="h6">Cargando...</Typography>
      )}
    </Box>
  );
}

export default ItemDetailContainer;
