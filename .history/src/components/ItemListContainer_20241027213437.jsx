import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Precio: ${item.price}</p>
        </div>
      ))}
    </Box>
  );
};

export default ItemListContainer;

