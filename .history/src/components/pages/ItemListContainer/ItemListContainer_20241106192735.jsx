import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../../../products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemList from './ItemList';
import { Skeleton } from '@mui/material';  // Importamos el Skeleton de MUI

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filteredProducts = categoryId
          ? products.filter((item) => item.category === categoryId)
          : products;

        // Eliminamos el setTimeout que simulaba el retraso
        setItems(filteredProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {greeting}
      </Typography>

      {/* Si estamos cargando, mostramos los Skeletons */}
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="text" width={210} height={30} />
          <Skeleton variant="text" width={210} height={30} />
          <Skeleton variant="text" width={210} height={30} />
        </Box>
      ) : (
        // Si ya se cargaron los productos, mostramos la lista de productos
        <ItemList items={items} />
      )}
    </Box>
  );
};

export default ItemListContainer;





