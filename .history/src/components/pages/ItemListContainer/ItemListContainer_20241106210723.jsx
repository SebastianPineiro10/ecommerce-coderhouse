import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../../products'; // Asegúrate de que la ruta sea correcta
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemList from './ItemList';
import { Skeleton } from '@mui/material'; // Asegúrate de importar Skeleton

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const filteredProducts = categoryId
        ? products.filter((item) => item.category === categoryId)
        : products;

      setItems(filteredProducts);
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {greeting}
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="text" width={210} height={30} />
          <Skeleton variant="text" width={210} height={30} />
          <Skeleton variant="text" width={210} height={30} />
        </Box>
      ) : (
        <ItemList items={items} />
      )}
    </Box>
  );
};

export default ItemListContainer;





