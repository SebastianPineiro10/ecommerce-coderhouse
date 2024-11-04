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
    setLoading(true);
    
    // Filtra los productos según la categoría
    const filteredProducts = categoryId
      ? products.filter((item) => item.category === categoryId)
      : products;

    // Simula una llamada a la API con un tiempo de espera
    const getProducts = new Promise((resolve) => {
      setTimeout(() => resolve(filteredProducts), 1000);
    });

    getProducts.then((res) => {
      setItems(res);
      setLoading(false);
    });
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



