import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../../../products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemList from './ItemList';

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

        await new Promise((resolve) => setTimeout(resolve, 1000));
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
      {loading ? (
        <Typography variant="h6">Cargando productos...</Typography>
      ) : (
        <ItemList items={items} />
      )}
    </Box>
  );
};

export default ItemListContainer;




