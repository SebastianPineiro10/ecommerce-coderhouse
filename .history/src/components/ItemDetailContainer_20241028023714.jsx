import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const filteredProducts = categoryId
      ? products.filter((item) => item.category === categoryId)
      : products;
    setItems(filteredProducts);
  }, [categoryId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">{greeting}</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Box>
    </Box>
  );
};

export default ItemListContainer;
